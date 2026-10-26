"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Dictionary } from "@/content/i18n/es";
import type { Locale } from "@/content/site";
import { site } from "@/content/site";
import { models, getModel } from "@/content/models";
import { pricing } from "@/content/pricing";
import { scopeBy } from "@/content/scope";
import { useBudget } from "@/lib/budget";
import { clampSurface, isValidSurface, pricePerM2 } from "@/lib/pricing";
import { euro, num } from "@/lib/format";
import { t } from "@/lib/i18n";
import { track, surfaceBand } from "@/lib/analytics";
import { Elevation } from "@/components/illustration/Elevation";
import { AnimatedEuro } from "@/components/ui/AnimatedEuro";
import { QuoteLink } from "@/components/ui/QuoteLink";
import { WhatsAppLink } from "@/components/layout/WhatsApp";

export interface ConfiguratorLabels {
  configurator: Dictionary["configurator"];
  common: Dictionary["common"];
  pricing: Dictionary["pricing"];
  pdf: Dictionary["pdf"];
  whatsapp: Dictionary["whatsapp"];
  modelNames: Record<string, string>;
}

interface Props {
  lang: Locale;
  labels: ConfiguratorLabels;
  contactHref: string;
  /** En la ficha de un modelo: fija el modelo y oculta el paso 1. */
  lockModel?: string;
  headingId?: string;
}

const STEP = 5;

export function Configurator({ lang, labels, contactHref, lockModel, headingId }: Props) {
  const L = labels.configurator;
  const C = labels.common;
  const { mode, setMode, slug, surface, selectModel, setSurface, estimate } = useBudget();
  const [draft, setDraft] = useState(String(surface));
  const [pdfState, setPdfState] = useState<"idle" | "busy" | "error">("idle");
  const inputId = useId();
  const errorId = useId();
  const lastTracked = useRef<number | null>(null);

  useEffect(() => {
    if (lockModel) selectModel(lockModel);
    // solo al montar en la ficha del modelo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockModel]);

  useEffect(() => setDraft(String(surface)), [surface]);

  const draftNumber = Number(draft.replace(",", "."));
  const draftValid = draft.trim() !== "" && isValidSurface(draftNumber);

  const commitSurface = (value: number) => {
    const v = clampSurface(value);
    setSurface(v);
    if (lastTracked.current !== v) {
      lastTracked.current = v;
      track("configurator_surface", { surface_band: surfaceBand(v), model: slug ?? "custom" });
    }
  };

  const model = getModel(slug);
  const adjusted = model && model.budgetSurface !== surface;
  const modelName = model ? labels.modelNames[model.slug] : L.custom;
  const withAssembly = mode === "assembly";
  const excluded = scopeBy("excluded").map((i) => i.label[lang]);
  const pending = scopeBy("pending").map((i) => i.label[lang]);
  const criterion = labels.pricing.criterion[pricing.surfaceCriterion];
  const rate = pricing.taxes.ratePercent;
  const taxText =
    rate === null ? C.taxesNote : t(C.taxesConfirmed, { taxName: pricing.taxes.name || "IVA", rate: num(rate, 1) });

  const onPdf = async () => {
    setPdfState("busy");
    try {
      const { downloadEstimatePdf } = await import("@/lib/pdf");
      await downloadEstimatePdf({
        lang,
        labels: labels.pdf,
        tagline: site.tagline[lang],
        modelName: model ? `${modelName}${adjusted ? ` (${L.custom.toLowerCase()})` : ""}` : labels.pdf.custom,
        modeName: withAssembly ? C.kitAssembly : C.kitOnly,
        estimate,
        rows: [
          { label: `${L.lineKit} (${t(L.perM2Result, { price: num(pricing.kitPerM2), m2: surface })})`, value: euro(estimate.kit) },
          { label: L.linePlans, value: C.includedPl },
          { label: L.lineTransport, value: C.included },
          withAssembly
            ? { label: `${L.lineAssembly} (${t(L.perM2Result, { price: num(pricing.assemblyPerM2), m2: surface })})`, value: euro(estimate.assembly) }
            : { label: L.lineAssemblyOff, value: "—" },
        ],
        included: [...scopeBy("included"), ...(withAssembly ? scopeBy("assembly") : [])].map(
          (i) => `${i.label[lang]}${i.note ? `. ${i.note[lang]}` : ""}`,
        ),
        excluded,
        pending,
        notes: [criterion, taxText, L.disclaimer, ...(pricing.estimateValidityDays ? [t(L.validity, { days: pricing.estimateValidityDays })] : [])],
      });
      track("budget_pdf_download", { model: slug ?? "custom", mode, surface_band: surfaceBand(surface) });
      setPdfState("idle");
    } catch {
      setPdfState("error");
    }
  };

  const stepNumber = (n: number) => (lockModel ? n - 1 : n);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* ── Pasos 1-3 ─────────────────────────────────────────── */}
      <div className="space-y-10 lg:col-span-7">
        {!lockModel ? (
          <fieldset>
            <legend className="flex items-baseline gap-3 text-[1.05rem] font-medium">
              <span className="figure text-grafito">1</span> {L.step1}
            </legend>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {models.map((m) => {
                const active = slug === m.slug;
                return (
                  <button
                    key={m.slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      selectModel(m.slug);
                      track("configurator_model", { model: m.slug });
                    }}
                    className={`group relative overflow-hidden rounded-2xl border text-left transition-colors duration-300 ${
                      active ? "border-antracita bg-paper" : "border-linea bg-paper/60 hover:border-grafito"
                    }`}
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-[#E9ECE9]">
                      <Elevation model={m} view="front" scene sideMargin={1.8} aspect={16 / 9} className="h-full w-full" preserveAspectRatio="xMidYMax slice" idPrefix="cfg-" />
                    </div>
                    <div className="flex items-baseline justify-between gap-2 px-3 py-2.5">
                      <span className="font-medium">{labels.modelNames[m.slug]}</span>
                      <span className="figure text-[0.85rem] text-grafito">{m.budgetSurface} m²</span>
                    </div>
                    {active ? <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-antracita ring-4 ring-cal" aria-hidden="true" /> : null}
                  </button>
                );
              })}
              <button
                type="button"
                aria-pressed={slug === null}
                onClick={() => {
                  selectModel(null);
                  track("configurator_model", { model: "custom" });
                }}
                className={`coursing flex min-h-28 flex-col justify-end rounded-2xl border p-3 text-left transition-colors duration-300 ${
                  slug === null ? "border-antracita bg-paper" : "border-linea bg-paper/60 hover:border-grafito"
                }`}
              >
                <span className="font-medium">{L.custom}</span>
                <span className="mt-0.5 text-[0.8rem] text-grafito">{L.customHint}</span>
              </button>
            </div>
          </fieldset>
        ) : null}

        <div>
          <label htmlFor={inputId} className="flex items-baseline gap-3 text-[1.05rem] font-medium">
            <span className="figure text-grafito">{stepNumber(2)}</span> {L.step2}
          </label>
          <div className="mt-4 rounded-2xl border border-linea bg-paper p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="btn btn-secondary h-14 w-14 shrink-0 px-0 text-xl"
                aria-label={L.decrease}
                onClick={() => commitSurface((draftValid ? draftNumber : surface) - STEP)}
                disabled={surface <= pricing.surface.min}
              >
                −
              </button>
              <div className="relative flex-1">
                <input
                  id={inputId}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  aria-describedby={`${errorId} ${inputId}-crit`}
                  aria-invalid={!draftValid}
                  value={draft}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "").slice(0, 3);
                    setDraft(v);
                    const n = Number(v);
                    if (v && isValidSurface(n)) setSurface(n);
                  }}
                  onBlur={() => {
                    if (draftValid) commitSurface(draftNumber);
                  }}
                  className="figure h-14 w-full rounded-xl border border-linea bg-cal text-center text-[1.75rem] focus:border-antracita focus:outline-none"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grafito">m²</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary h-14 w-14 shrink-0 px-0 text-xl"
                aria-label={L.increase}
                onClick={() => commitSurface((draftValid ? draftNumber : surface) + STEP)}
                disabled={surface >= pricing.surface.max}
              >
                +
              </button>
            </div>
            <input
              type="range"
              min={pricing.surface.min}
              max={pricing.surface.max}
              step={pricing.surface.step}
              value={surface}
              aria-label={L.surfaceInput}
              onChange={(e) => setSurface(Number(e.target.value))}
              onPointerUp={(e) => commitSurface(Number((e.target as HTMLInputElement).value))}
              onKeyUp={(e) => commitSurface(Number((e.target as HTMLInputElement).value))}
              className="mt-5 w-full accent-antracita"
            />
            <div className="mt-1 flex justify-between text-[0.75rem] text-grafito">
              <span>{pricing.surface.min} m²</span>
              <span>{pricing.surface.max} m²</span>
            </div>
            <p id={errorId} className={`mt-2 text-[0.85rem] ${draftValid ? "sr-only" : "text-alerta"}`} role={draftValid ? undefined : "alert"}>
              {draftValid ? "" : t(L.rangeError, { min: pricing.surface.min, max: pricing.surface.max })}
            </p>
            <p id={`${inputId}-crit`} className="mt-2 text-[0.78rem] leading-snug text-grafito">
              {criterion}
            </p>
          </div>
        </div>

        <fieldset>
          <legend className="flex items-baseline gap-3 text-[1.05rem] font-medium">
            <span className="figure text-grafito">{stepNumber(3)}</span> {L.step3}
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label={L.step3}>
            {(["kit", "assembly"] as const).map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setMode(m);
                    track("configurator_mode", { mode: m, location: "configurator" });
                  }}
                  className={`flex min-h-24 items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-colors duration-300 ${
                    active ? "border-antracita bg-antracita text-cal" : "border-linea bg-paper hover:border-grafito"
                  }`}
                >
                  <span>
                    <span className="block font-medium">{m === "kit" ? C.kitOnly : C.kitAssembly}</span>
                    <span className={`mt-1 block text-[0.82rem] ${active ? "text-cal/70" : "text-grafito"}`}>
                      {m === "kit" ? `${L.lineKit}, ${L.linePlans.toLowerCase()}, ${L.lineTransport.toLowerCase()}` : `${L.lineKit} + ${L.lineAssembly.toLowerCase()}`}
                    </span>
                  </span>
                  <span className="figure shrink-0 text-[1.35rem] leading-none">
                    {num(pricePerM2(m))}
                    <span className={`ml-1 text-[0.7rem] ${active ? "text-cal/70" : "text-grafito"}`}>€/m²</span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* ── Paso 4: resultado ─────────────────────────────────── */}
      <div className="lg:col-span-5">
        <div className="rounded-[1.5rem] bg-antracita p-5 text-cal sm:p-7 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <h3 id={headingId} className="flex items-baseline gap-3 text-[1.05rem] font-medium">
            <span className="figure text-cal/50">{stepNumber(4)}</span> {L.step4}
          </h3>
          <p className="mt-3 text-[0.9rem] text-cal/70">
            {modelName}
            {adjusted ? `, ${L.custom.toLowerCase()}` : ""}, {surface} m²
          </p>

          <table className="mt-5 w-full text-[0.92rem]">
            <caption className="sr-only">{L.step4}</caption>
            <thead>
              <tr className="text-left text-[0.75rem] text-cal/50">
                <th scope="col" className="pb-2 font-normal">
                  {L.concept}
                </th>
                <th scope="col" className="pb-2 text-right font-normal">
                  {L.amount}
                </th>
              </tr>
            </thead>
            <tbody className="[&_td]:py-2.5 [&_tr]:border-t [&_tr]:border-cal/12">
              <tr>
                <td>
                  {L.lineKit}
                  <span className="block text-[0.75rem] text-cal/55">{t(L.perM2Result, { price: num(pricing.kitPerM2), m2: surface })}</span>
                </td>
                <td className="figure text-right">
                  <AnimatedEuro value={estimate.kit} />
                </td>
              </tr>
              <tr>
                <td>{L.linePlans}</td>
                <td className="text-right text-cal/80">{C.includedPl}</td>
              </tr>
              <tr>
                <td>{L.lineTransport}</td>
                <td className="text-right text-cal/80">{C.included}</td>
              </tr>
              <tr>
                <td>
                  <span className="flex items-center gap-3">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={withAssembly}
                      aria-label={L.assemblyToggle}
                      onClick={() => {
                        const next = withAssembly ? "kit" : "assembly";
                        setMode(next);
                        track("configurator_mode", { mode: next, location: "summary" });
                      }}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${withAssembly ? "bg-arena" : "bg-cal/20"}`}
                    >
                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-cal transition-transform duration-300 ${withAssembly ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                    <span>
                      {L.lineAssembly}
                      <span className="block text-[0.75rem] text-cal/55">
                        {withAssembly ? t(L.perM2Result, { price: num(pricing.assemblyPerM2), m2: surface }) : `${L.assemblyToggle} (${L.assemblyHint})`}
                      </span>
                    </span>
                  </span>
                </td>
                <td className={`figure text-right ${withAssembly ? "" : "text-cal/40"}`}>
                  {withAssembly ? <AnimatedEuro value={estimate.assembly} /> : "—"}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-2 flex items-end justify-between gap-4 border-t border-cal/30 pt-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={mode}
                className="text-[0.95rem]"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {withAssembly ? L.totalAssembly : L.totalKit}
              </motion.p>
            </AnimatePresence>
            <AnimatedEuro value={estimate.subtotal} className="figure text-[2.2rem] leading-none sm:text-[2.6rem]" />
          </div>

          {estimate.tax !== null && estimate.totalWithTax !== null ? (
            <dl className="mt-3 grid grid-cols-[1fr_auto] gap-y-1 text-[0.85rem] text-cal/75">
              <dt>{t(L.taxLine, { taxName: pricing.taxes.name || "IVA", rate: num(rate ?? 0, 1) })}</dt>
              <dd className="figure text-right">{euro(estimate.tax)}</dd>
              <dt>{L.totalWithTax}</dt>
              <dd className="figure text-right">{euro(estimate.totalWithTax)}</dd>
            </dl>
          ) : null}

          <p className="mt-4 text-[0.78rem] leading-snug text-cal/60">
            {taxText} {L.disclaimer}
            {pricing.estimateValidityDays ? ` ${t(L.validity, { days: pricing.estimateValidityDays })}` : ""}
          </p>

          <div className="mt-6 grid gap-2">
            <QuoteLink href={contactHref} slug={slug} className="btn btn-light w-full" location="configurator">
              {L.request}
            </QuoteLink>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onPdf}
                disabled={pdfState === "busy"}
                className="btn flex-1 border border-cal/30 px-3 text-cal hover:border-cal"
              >
                {pdfState === "busy" ? L.pdfBusy : L.pdf}
              </button>
              <WhatsAppLink
                labels={{ ...labels.whatsapp, kitOnly: C.kitOnly, kitAssembly: C.kitAssembly }}
                lang={lang}
                location="configurator"
                className="btn flex-1 gap-2 border border-cal/30 px-3 text-cal hover:border-cal"
              />
            </div>
            {pdfState === "error" ? (
              <p role="alert" className="text-[0.82rem] text-arena">
                {L.pdfError}
              </p>
            ) : null}
          </div>

          <details className="group mt-6 border-t border-cal/15 pt-4" open>
            <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between text-[0.9rem]">
              {L.exclusionsTitle}
              <span className="text-cal/50 transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <ul className="mt-2 space-y-1.5 text-[0.82rem] text-cal/70">
              {excluded.map((x) => (
                <li key={x} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.55em] h-px w-2.5 shrink-0 bg-cal/40" />
                  {x}
                </li>
              ))}
            </ul>
          </details>
          <details className="group mt-3 border-t border-cal/15 pt-4">
            <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between text-[0.9rem]">
              {L.pendingTitle}
              <span className="text-cal/50 transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <ul className="mt-2 space-y-1.5 text-[0.82rem] text-cal/70">
              {pending.map((x) => (
                <li key={x} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[0.55em] h-px w-2.5 shrink-0 bg-cal/40" />
                  {x}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
