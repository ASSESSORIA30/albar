import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site, type Locale } from "@/content/site";
import { models } from "@/content/models";
import { pricing } from "@/content/pricing";
import { scope } from "@/content/scope";
import { euro } from "@/lib/format";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ lang: Locale }> };

const enabled = () => process.env.NODE_ENV !== "production" || process.env.ENABLE_CONFIG_PANEL === "true";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/panel-datos", title: d.meta.panelTitle, description: d.panel.intro, noindex: true });
}

export default async function PanelPage({ params }: Props) {
  if (!enabled()) notFound();
  const { lang } = await params;
  const d = getDictionary(lang);
  const env = (k: string) => Boolean(process.env[k]);

  const groups: { title: string; file: string; rows: [string, boolean, string?][] }[] = [
    {
      title: "Marca y contacto",
      file: "src/content/site.ts",
      rows: [
        ["Nombre comercial", Boolean(site.brand), site.brand],
        ["URL pública (NEXT_PUBLIC_SITE_URL)", env("NEXT_PUBLIC_SITE_URL"), site.url],
        ["Teléfono", Boolean(site.contact.phone)],
        ["Email comercial", Boolean(site.contact.email)],
        ["WhatsApp (NEXT_PUBLIC_WHATSAPP_NUMBER)", Boolean(site.contact.whatsapp)],
        ["Dirección / exposición", Boolean(site.contact.address)],
      ],
    },
    {
      title: "Datos legales",
      file: "src/content/site.ts → legal",
      rows: [
        ["Razón social", Boolean(site.legal.companyName)],
        ["NIF", Boolean(site.legal.taxId)],
        ["Domicilio social", Boolean(site.legal.registeredAddress)],
        ["Registro Mercantil", Boolean(site.legal.registry)],
        ["Email de privacidad", Boolean(site.legal.privacyEmail)],
        ["Fecha de revisión legal", Boolean(site.legal.lastUpdated)],
      ],
    },
    {
      title: "Envío de solicitudes",
      file: "Variables de entorno en Vercel",
      rows: [
        ["Email: RESEND_API_KEY", env("RESEND_API_KEY")],
        ["Email: LEAD_EMAIL_TO", env("LEAD_EMAIL_TO")],
        ["Email: LEAD_EMAIL_FROM", env("LEAD_EMAIL_FROM")],
        ["CRM: CRM_WEBHOOK_URL", env("CRM_WEBHOOK_URL")],
        ["Antispam: Turnstile (ambas claves)", env("NEXT_PUBLIC_TURNSTILE_SITE_KEY") && env("TURNSTILE_SECRET_KEY")],
        ["Analítica: NEXT_PUBLIC_GA4_ID", env("NEXT_PUBLIC_GA4_ID")],
      ],
    },
    {
      title: "Precios y condiciones",
      file: "src/content/pricing.ts",
      rows: [
        ["Kit", true, `${euro(pricing.kitPerM2)}/m²`],
        ["Montaje", true, `${euro(pricing.assemblyPerM2)}/m²`],
        ["Criterio de medición de superficie", pricing.surfaceCriterion !== "pending", pricing.surfaceCriterion],
        ["Tipo de impuestos", pricing.taxes.ratePercent !== null, pricing.taxes.ratePercent === null ? "sin confirmar" : `${pricing.taxes.ratePercent} %`],
        ["Validez del presupuesto", pricing.estimateValidityDays !== null],
        ["Partidas pendientes de confirmar", scope.every((s) => s.status !== "pending"), `${scope.filter((s) => s.status === "pending").length} partidas`],
      ],
    },
    {
      title: "Modelos",
      file: "src/content/models.ts",
      rows: models.flatMap((m) => [
        [`${m.copy.es.name}: programa validado`, m.programValidated] as [string, boolean],
        [`${m.copy.es.name}: renders reales`, Boolean(m.renders.front && m.renders.rear && m.renders.aerial), Object.keys(m.renders).join(", ") || "ilustración generada"] as [string, boolean, string],
      ]),
    },
  ];

  return (
    <section className="shell max-w-5xl py-16">
      <h1 className="display text-[2.75rem]">{d.meta.panelTitle}</h1>
      <p className="lead mt-4 max-w-2xl">{d.panel.intro}</p>
      <div className="mt-12 space-y-10">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="heading text-[1.4rem]">{g.title}</h2>
              <code className="text-[0.8rem] text-grafito">{g.file}</code>
            </div>
            <ul className="mt-3 divide-y divide-linea border-y border-linea">
              {g.rows.map(([label, ok, detail]) => (
                <li key={label} className="flex items-center justify-between gap-4 py-2.5 text-[0.92rem]">
                  <span>
                    {label}
                    {detail ? <span className="ml-2 text-grafito">({detail})</span> : null}
                  </span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[0.75rem] ${ok ? "bg-oliva/15 text-oliva" : "bg-arena/35 text-antracita"}`}>
                    {ok ? d.panel.ok : d.panel.missing}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
