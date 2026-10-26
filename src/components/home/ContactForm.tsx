"use client";

import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dictionary } from "@/content/i18n/es";
import { site, type Locale } from "@/content/site";
import { models, getModel } from "@/content/models";
import { pricing } from "@/content/pricing";
import { provinces, OTHER_PROVINCE } from "@/content/provinces";
import { useBudget } from "@/lib/budget";
import { leadSchema, type LeadResponse, type LeadErrorCode } from "@/lib/lead";
import { euro } from "@/lib/format";
import { t } from "@/lib/i18n";
import { track, surfaceBand } from "@/lib/analytics";
import { WhatsAppLink } from "@/components/layout/WhatsApp";

type Land = "yes" | "no" | "searching" | "";
type Status = "edit" | "review" | "sending" | "success" | "error" | "not_configured";

interface Props {
  lang: Locale;
  labels: Dictionary["contact"];
  common: Dictionary["common"];
  configurator: Dictionary["configurator"];
  whatsapp: Dictionary["whatsapp"];
  privacyHref: string;
  modelNames: Record<string, string>;
}

const TURNSTILE = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

declare global {
  interface Window {
    onAlbarTurnstile?: (token: string) => void;
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}

export function ContactForm({ lang, labels, common, configurator, whatsapp, privacyHref, modelNames }: Props) {
  const params = useSearchParams();
  const budget = useBudget();
  const { slug, surface, mode, estimate, selectModel, setSurface, setMode, touched } = budget;
  const uid = useId();
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState({ name: "", phone: "", email: "", province: "", land: "" as Land, message: "", consent: false, website: "" });
  const [surfaceDraft, setSurfaceDraft] = useState(String(surface));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("edit");
  const [errorCode, setErrorCode] = useState<LeadErrorCode | "network" | null>(null);
  const [token, setToken] = useState<string>("");
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    startedAt.current = Date.now();
    window.onAlbarTurnstile = (tk: string) => setToken(tk);
  }, []);

  // Datos que llegan desde el configurador o una tarjeta de modelo (?modelo=&m2=&modalidad=)
  useEffect(() => {
    const m = params.get("modelo");
    const m2 = Number(params.get("m2"));
    const md = params.get("modalidad");
    let applied = false;
    if (m && getModel(m) && m !== slug) {
      selectModel(m);
      applied = true;
    }
    if (m2 && m2 >= pricing.surface.min && m2 <= pricing.surface.max) {
      setSurface(Math.round(m2));
      applied = true;
    }
    if (md === "montaje" || md === "kit") {
      setMode(md === "montaje" ? "assembly" : "kit");
      applied = true;
    }
    if (applied || touched || m) setPrefilled(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => setSurfaceDraft(String(surface)), [surface]);

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const payload = () => ({
    ...values,
    model: slug ?? "",
    surface,
    mode,
    lang,
    startedAt: startedAt.current,
    turnstileToken: token || undefined,
  });

  const validate = () => {
    const next: Record<string, string> = {};
    const draftN = Number(surfaceDraft);
    if (!(draftN >= pricing.surface.min && draftN <= pricing.surface.max)) next.surface = t(labels.errors.surface, { min: pricing.surface.min, max: pricing.surface.max });
    const parsed = leadSchema.safeParse(payload());
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (key in labels.errors && !next[key]) next[key] = (labels.errors as Record<string, string>)[key];
      }
    }
    if (TURNSTILE && !token) next.captcha = labels.errors.captcha;
    setErrors(next);
    return next;
  };

  const onReview = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    const first = Object.keys(errs).find((k) => errs[k]);
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      return;
    }
    setStatus("review");
    track("lead_review", { model: slug ?? "custom", mode, surface_band: surfaceBand(surface) });
    requestAnimationFrame(() => reviewRef.current?.focus());
  };

  const onSend = async () => {
    setStatus("sending");
    setErrorCode(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as LeadResponse;
      if (res.ok && data.ok) {
        setStatus("success");
        track("lead_submit_success", { model: slug ?? "custom", mode, surface_band: surfaceBand(surface) });
      } else if (data.error === "not_configured") {
        setStatus("not_configured");
        track("lead_submit_error", { status: "not_configured" });
      } else {
        setErrorCode(data.error ?? "delivery_failed");
        setStatus("error");
        track("lead_submit_error", { status: data.error ?? "unknown" });
        if (TURNSTILE) {
          window.turnstile?.reset();
          setToken("");
        }
      }
    } catch {
      setErrorCode("network");
      setStatus("error");
      track("lead_submit_error", { status: "network" });
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const reset = () => {
    setValues({ name: "", phone: "", email: "", province: "", land: "", message: "", consent: false, website: "" });
    setStatus("edit");
    startedAt.current = Date.now();
  };

  const field = (name: string) => ({
    id: `${uid}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-err` : undefined,
  });
  const Err = ({ name }: { name: string }) =>
    errors[name] ? (
      <p id={`${uid}-${name}-err`} className="mt-1.5 text-[0.82rem] text-alerta">
        {errors[name]}
      </p>
    ) : null;

  const model = getModel(slug);
  const modeName = mode === "assembly" ? common.kitAssembly : common.kitOnly;
  const landName = { yes: labels.fields.landYes, no: labels.fields.landNo, searching: labels.fields.landSearching, "": "—" }[values.land];
  const consentText = t(labels.fields.consent, { brand: site.brand });
  const [before, after] = consentText.split(labels.fields.privacyLink);

  const summaryRows: [string, string][] = [
    [labels.fields.name, values.name],
    [labels.fields.phone, values.phone],
    [labels.fields.email, values.email],
    [labels.fields.province, values.province],
    [labels.fields.model, model ? modelNames[model.slug] : labels.fields.modelNone],
    [labels.fields.surface, `${surface} m²`],
    [labels.fields.mode, modeName],
    [labels.fields.land, landName],
    ...(values.message ? ([[labels.fields.message, values.message]] as [string, string][]) : []),
  ];

  const errorText =
    errorCode === "rate_limited"
      ? labels.error.rate
      : errorCode === "spam"
        ? labels.error.spam
        : errorCode === "validation"
          ? labels.error.validation
          : labels.error.text;

  const wa = { ...whatsapp, kitOnly: common.kitOnly, kitAssembly: common.kitAssembly };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      {TURNSTILE ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer /> : null}

      {/* Resumen del presupuesto que acompaña a la solicitud */}
      <aside className="order-2 lg:order-1 lg:col-span-4">
        <div className="rounded-[1.25rem] border border-linea bg-paper p-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <h3 className="text-[0.95rem] font-medium">{labels.estimateTitle}</h3>
          <p className="mt-1 text-[0.85rem] text-grafito">
            {model ? modelNames[model.slug] : configurator.custom}, {surface} m², {modeName.toLowerCase()}
          </p>
          <dl className="mt-4 space-y-1.5 border-t border-linea pt-4 text-[0.88rem]">
            <div className="flex justify-between gap-4">
              <dt className="text-grafito">{configurator.lineKit}</dt>
              <dd className="figure">{euro(estimate.kit)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-grafito">{configurator.linePlans}</dt>
              <dd>{common.includedPl}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-grafito">{configurator.lineTransport}</dt>
              <dd>{common.included}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-grafito">{configurator.lineAssembly}</dt>
              <dd className="figure">{mode === "assembly" ? euro(estimate.assembly) : "—"}</dd>
            </div>
            <div className="flex items-end justify-between gap-4 border-t border-linea pt-3">
              <dt>{mode === "assembly" ? configurator.totalAssembly : configurator.totalKit}</dt>
              <dd className="figure text-[1.5rem] leading-none">{euro(estimate.subtotal)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[0.75rem] leading-snug text-grafito">
            {common.taxesNote} {configurator.disclaimer}
          </p>
        </div>
      </aside>

      <div className="order-1 lg:order-2 lg:col-span-8">
        <AnimatePresence mode="wait" initial={false}>
          {status === "edit" ? (
            <motion.form
              key="edit"
              ref={formRef}
              noValidate
              onSubmit={onReview}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {prefilled ? (
                <p className="rounded-xl bg-piedra px-4 py-3 text-[0.88rem] sm:col-span-2">{labels.fromConfigurator}</p>
              ) : null}

              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-name`} className="mb-1.5 block text-[0.9rem]">
                  {labels.fields.name}
                </label>
                <input {...field("name")} className="field" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} />
                <Err name="name" />
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-[0.9rem]">
                  {labels.fields.phone}
                </label>
                <input {...field("phone")} className="field" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} />
                <Err name="phone" />
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="mb-1.5 block text-[0.9rem]">
                  {labels.fields.email}
                </label>
                <input {...field("email")} className="field" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} />
                <Err name="email" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-province`} className="mb-1.5 block text-[0.9rem]">
                  {labels.fields.province}
                </label>
                <select {...field("province")} className="field" value={values.province} onChange={(e) => set("province", e.target.value)}>
                  <option value="">{labels.fields.provincePlaceholder}</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                  <option value={OTHER_PROVINCE}>{OTHER_PROVINCE}</option>
                </select>
                <Err name="province" />
              </div>
              <div>
                <label htmlFor={`${uid}-model`} className="mb-1.5 block text-[0.9rem]">
                  {labels.fields.model}
                </label>
                <select
                  {...field("model")}
                  className="field"
                  value={slug ?? ""}
                  onChange={(e) => selectModel(e.target.value || null)}
                >
                  <option value="">{labels.fields.modelNone}</option>
                  {models.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {modelNames[m.slug]} ({m.budgetSurface} m²)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${uid}-surface`} className="mb-1.5 block text-[0.9rem]">
                  {labels.fields.surface}
                </label>
                <input
                  {...field("surface")}
                  className="field"
                  inputMode="numeric"
                  value={surfaceDraft}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 3);
                    setSurfaceDraft(v);
                    const n = Number(v);
                    if (n >= pricing.surface.min && n <= pricing.surface.max) setSurface(n);
                    if (errors.surface) setErrors((er) => ({ ...er, surface: "" }));
                  }}
                />
                <Err name="surface" />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className="mb-1.5 text-[0.9rem]">{labels.fields.mode}</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["kit", "assembly"] as const).map((m) => (
                    <label
                      key={m}
                      className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-3 text-center text-[0.92rem] transition-colors ${
                        mode === m ? "border-antracita bg-antracita text-cal" : "border-linea bg-paper"
                      }`}
                    >
                      <input type="radio" name="mode" value={m} checked={mode === m} onChange={() => setMode(m)} className="sr-only" />
                      {m === "kit" ? common.kitOnly : common.kitAssembly}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="sm:col-span-2" aria-describedby={errors.land ? `${uid}-land-err` : undefined}>
                <legend className="mb-1.5 text-[0.9rem]">{labels.fields.land}</legend>
                <div className="grid grid-cols-3 gap-2">
                  {(["yes", "no", "searching"] as const).map((l) => (
                    <label
                      key={l}
                      className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border px-2 text-center text-[0.88rem] leading-tight transition-colors ${
                        values.land === l ? "border-antracita bg-antracita text-cal" : errors.land ? "border-alerta bg-paper" : "border-linea bg-paper"
                      }`}
                    >
                      <input type="radio" name="land" value={l} checked={values.land === l} onChange={() => set("land", l)} className="sr-only" />
                      {l === "yes" ? labels.fields.landYes : l === "no" ? labels.fields.landNo : labels.fields.landSearching}
                    </label>
                  ))}
                </div>
                <Err name="land" />
              </fieldset>

              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-message`} className="mb-1.5 block text-[0.9rem]">
                  {labels.fields.message}
                </label>
                <textarea
                  {...field("message")}
                  rows={4}
                  maxLength={2000}
                  className="field min-h-28 resize-y"
                  placeholder={labels.fields.messagePlaceholder}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              </div>

              {/* Honeypot antispam: invisible para personas */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  {labels.fields.honeypot}
                  <input tabIndex={-1} autoComplete="off" name="website" value={values.website} onChange={(e) => set("website", e.target.value)} />
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-snug">
                  <input
                    {...field("consent")}
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-antracita"
                  />
                  <span>
                    {before}
                    <Link href={privacyHref} className="link" target="_blank">
                      {labels.fields.privacyLink}
                    </Link>
                    {after}
                  </span>
                </label>
                <Err name="consent" />
              </div>

              {TURNSTILE ? (
                <div className="sm:col-span-2">
                  <div className="cf-turnstile" data-sitekey={TURNSTILE} data-callback="onAlbarTurnstile" data-language={lang} />
                  <Err name="captcha" />
                </div>
              ) : null}

              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-primary w-full sm:w-auto sm:px-10">
                  {labels.review}
                </button>
              </div>
            </motion.form>
          ) : status === "review" || status === "sending" ? (
            <motion.div
              key="review"
              ref={reviewRef}
              tabIndex={-1}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="outline-none"
            >
              <h3 className="heading text-[1.6rem]">{labels.reviewTitle}</h3>
              <p className="mt-1 text-grafito">{labels.reviewIntro}</p>
              <dl className="mt-6 divide-y divide-linea border-y border-linea">
                {summaryRows.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-4">
                    <dt className="text-[0.85rem] text-grafito">{k}</dt>
                    <dd className="whitespace-pre-line break-words">{v}</dd>
                  </div>
                ))}
                <div className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-4">
                  <dt className="text-[0.85rem] text-grafito">{labels.estimateTitle}</dt>
                  <dd className="figure text-[1.25rem]">{euro(estimate.subtotal)}</dd>
                </div>
              </dl>
              <div className="mt-6 grid gap-2 sm:flex">
                <button type="button" onClick={onSend} disabled={status === "sending"} className="btn btn-primary sm:px-10" aria-busy={status === "sending"}>
                  {status === "sending" ? labels.sending : labels.send}
                </button>
                <button type="button" onClick={() => setStatus("edit")} disabled={status === "sending"} className="btn btn-secondary">
                  {labels.edit}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={status}
              ref={resultRef}
              tabIndex={-1}
              role={status === "success" ? "status" : "alert"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-[1.25rem] border border-linea bg-paper p-6 outline-none sm:p-8"
            >
              {status === "success" ? (
                <>
                  <h3 className="heading text-[1.8rem]">{labels.success.title}</h3>
                  <p className="prose-serif mt-2 text-grafito">{t(labels.success.text, { email: values.email })}</p>
                  <button type="button" onClick={reset} className="btn btn-secondary mt-6">
                    {labels.success.again}
                  </button>
                </>
              ) : status === "not_configured" ? (
                <>
                  <h3 className="heading text-[1.6rem]">{labels.notConfigured.title}</h3>
                  <p className="prose-serif mt-2 text-grafito">{labels.notConfigured.text}</p>
                  <DirectContact labels={labels} wa={wa} lang={lang} />
                  <button type="button" onClick={() => setStatus("review")} className="btn btn-secondary mt-6">
                    {common.back}
                  </button>
                </>
              ) : (
                <>
                  <h3 className="heading text-[1.6rem]">{labels.error.title}</h3>
                  <p className="prose-serif mt-2 text-grafito">{errorText}</p>
                  <div className="mt-6 grid gap-2 sm:flex">
                    <button type="button" onClick={onSend} className="btn btn-primary">
                      {labels.error.retry}
                    </button>
                    <button type="button" onClick={() => setStatus("edit")} className="btn btn-secondary">
                      {labels.edit}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DirectContact({
  labels,
  wa,
  lang,
}: {
  labels: Dictionary["contact"];
  wa: Dictionary["whatsapp"] & { kitOnly: string; kitAssembly: string };
  lang: Locale;
}) {
  const { phone, email, whatsapp } = site.contact;
  if (!phone && !email && !whatsapp) return <p className="mt-4 text-[0.9rem] text-grafito">{labels.notConfigured.none}</p>;
  return (
    <ul className="mt-4 space-y-2">
      {phone ? (
        <li>
          {labels.phoneLabel}:{" "}
          <a className="link" href={`tel:${phone.replace(/\s/g, "")}`}>
            {phone}
          </a>
        </li>
      ) : null}
      {email ? (
        <li>
          {labels.emailLabel}:{" "}
          <a className="link" href={`mailto:${email}`}>
            {email}
          </a>
        </li>
      ) : null}
      {whatsapp ? (
        <li>
          <WhatsAppLink labels={wa} lang={lang} location="contact_fallback" className="link inline-flex items-center gap-2" />
        </li>
      ) : null}
    </ul>
  );
}
