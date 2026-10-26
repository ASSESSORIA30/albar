import { NextResponse, type NextRequest } from "next/server";
import { leadSchema, type LeadInput, type LeadResponse } from "@/lib/lead";
import { estimate } from "@/lib/pricing";
import { getModel } from "@/content/models";
import { site } from "@/content/site";
import { pricing } from "@/content/pricing";
import { euro } from "@/lib/format";

export const runtime = "nodejs";

/* ── Límite de envíos por IP (memoria del proceso). En Vercel es por instancia:
      para un límite global, sustituir por Upstash/Redis o Vercel KV. ── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

function json(body: LeadResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // no configurado: se usan honeypot + tiempo mínimo + límite por IP
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function buildSummary(lead: LeadInput, id: string) {
  const model = getModel(lead.model);
  const e = estimate(lead.surface, lead.mode);
  const landText = { yes: "Sí", no: "No", searching: "Lo está buscando" }[lead.land];
  const rows: [string, string][] = [
    ["Referencia", id],
    ["Nombre", lead.name],
    ["Teléfono", lead.phone],
    ["Email", lead.email],
    ["Provincia", lead.province],
    ["Modelo", model ? `${model.copy.es.name} (${model.budgetSurface} m² de catálogo)` : "Superficie personalizada"],
    ["Superficie presupuestada", `${lead.surface} m²`],
    ["Modalidad", lead.mode === "assembly" ? "Kit + montaje" : "Solo kit"],
    ["Kit", euro(e.kit)],
    ["Montaje", lead.mode === "assembly" ? euro(e.assembly) : "No seleccionado"],
    ["Total orientativo sin impuestos", euro(e.subtotal)],
    ["Terreno", landText],
    ["Idioma", lead.lang],
    ["Mensaje", lead.message || "—"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#2A2B28">
<h2 style="font-weight:400">Nueva solicitud de presupuesto · ${esc(site.brand)}</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#5B5A54;vertical-align:top">${esc(k)}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>
<p style="color:#5B5A54;font-size:12px">Presupuesto orientativo calculado en servidor (${pricing.kitPerM2} €/m² kit, ${pricing.assemblyPerM2} €/m² montaje). Impuestos no incluidos.</p>
</body></html>`;
  return { text, html, estimate: e, model };
}

async function sendEmail(lead: LeadInput, summary: ReturnType<typeof buildSummary>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!key || !to || !from) return null; // no configurado
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: lead.email,
      subject: `Solicitud de presupuesto: ${summary.model ? summary.model.copy.es.name : "superficie personalizada"}, ${lead.surface} m² (${lead.province})`,
      text: summary.text,
      html: summary.html,
    }),
  });
  return res.ok;
}

async function sendCrm(lead: LeadInput, id: string, summary: ReturnType<typeof buildSummary>) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return null;
  const secret = process.env.CRM_WEBHOOK_SECRET;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(secret ? { Authorization: `Bearer ${secret}` } : {}) },
    body: JSON.stringify({
      id,
      createdAt: new Date().toISOString(),
      source: "web",
      contact: { name: lead.name, phone: lead.phone, email: lead.email, province: lead.province, language: lead.lang },
      project: {
        model: lead.model || null,
        surfaceM2: lead.surface,
        mode: lead.mode,
        land: lead.land,
        message: lead.message || null,
      },
      estimate: {
        currency: pricing.currency,
        kit: summary.estimate.kit,
        assembly: summary.estimate.assembly,
        subtotalExclTaxes: summary.estimate.subtotal,
      },
      consent: { privacy: true, at: new Date().toISOString() },
    }),
  });
  return res.ok;
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "validation", fields: ["body"] }, 400);
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0])))];
    // Honeypot relleno o envío demasiado rápido: tratado como spam.
    if (fields.includes("website")) return json({ ok: false, error: "spam" }, 403);
    return json({ ok: false, error: "validation", fields }, 400);
  }
  const lead = parsed.data;

  if (Date.now() - lead.startedAt < 3000) return json({ ok: false, error: "spam" }, 403);
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);
  if (!(await verifyTurnstile(lead.turnstileToken, ip))) return json({ ok: false, error: "spam" }, 403);

  const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO && process.env.LEAD_EMAIL_FROM);
  const crmConfigured = Boolean(process.env.CRM_WEBHOOK_URL);
  if (!emailConfigured && !crmConfigured) {
    // Nunca se confirma un envío que no se ha producido.
    return json({ ok: false, error: "not_configured" }, 503);
  }

  const id = `${site.brand.slice(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
  const summary = buildSummary(lead, id);

  const [email, crm] = await Promise.allSettled([sendEmail(lead, summary), sendCrm(lead, id, summary)]);
  const delivered: string[] = [];
  if (email.status === "fulfilled" && email.value === true) delivered.push("email");
  if (crm.status === "fulfilled" && crm.value === true) delivered.push("crm");

  if (!delivered.length) {
    console.error("[lead] fallo de entrega", { id, email, crm });
    return json({ ok: false, error: "delivery_failed" }, 502);
  }
  return json({ ok: true, id, delivered }, 200);
}

export function GET() {
  return json({ ok: false }, 405);
}
