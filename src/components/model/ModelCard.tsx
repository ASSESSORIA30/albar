import Link from "next/link";
import type { HouseModel } from "@/content/models";
import type { Dictionary } from "@/content/i18n/es";
import type { Locale } from "@/content/site";
import { href, routes, t } from "@/lib/i18n";
import { ModelVisual } from "./ModelVisual";
import { FloorPlan } from "@/components/illustration/FloorPlan";
import { ModelPrice } from "@/components/ui/ModelPrice";
import { QuoteLink } from "@/components/ui/QuoteLink";
import { programText } from "./program";

export function ModelCard({
  model,
  lang,
  dict,
  feature = false,
  headingLevel = "h3",
}: {
  model: HouseModel;
  lang: Locale;
  dict: Dictionary;
  feature?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const copy = model.copy[lang];
  const H = headingLevel;
  const ground = model.floors[0];
  return (
    <article className={`group grid gap-6 ${feature ? "lg:grid-cols-12 lg:gap-10" : ""}`}>
      <Link
        href={href(lang, routes.model(model.slug))}
        className={`relative block aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[#E9ECE9] ${feature ? "lg:col-span-8" : ""}`}
        aria-label={`${dict.common.viewHouse}: ${copy.name}`}
        tabIndex={-1}
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-arch)] group-hover:scale-[1.025]">
          <ModelVisual model={model} view="front" alt={`${copy.name}, ${dict.model.views.front}`} aspect={16 / 10} />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-cal/85 px-3 py-1 text-[0.72rem] text-grafito backdrop-blur-sm">
          {dict.common.illustrationShort}
        </span>
      </Link>

      <div className={`flex flex-col ${feature ? "lg:col-span-4 lg:py-2" : ""}`}>
        <div className="flex items-baseline justify-between gap-4">
          <H className="display text-[2.4rem] sm:text-[2.8rem]">
            <Link href={href(lang, routes.model(model.slug))} className="hover:text-grafito">
              {copy.name}
            </Link>
          </H>
          <p className="figure text-[1.15rem] text-grafito">
            {model.budgetSurface} {dict.common.m2}
          </p>
        </div>
        <p className="prose-serif mt-2 text-grafito">{copy.summary}</p>

        <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t border-linea pt-4 text-[0.9rem]">
          <dt className="text-grafito">{dict.pricing.surfaceLabel}</dt>
          <dd>
            {model.budgetSurface} {dict.common.m2}
          </dd>
          <dt className="text-grafito">{dict.model.storeys}</dt>
          <dd>{model.storeys === 1 ? dict.common.floors1 : dict.common.floors2}</dd>
          <dt className="text-grafito">{dict.model.program}</dt>
          <dd>
            {programText(model, dict)}
            {!model.programValidated ? <span className="ml-1.5 text-[0.78rem] text-arena-deep">({dict.common.proposal.toLowerCase()})</span> : null}
          </dd>
        </dl>

        <div className="mt-5 flex items-center gap-4">
          <div className="w-28 shrink-0 overflow-hidden rounded-lg border border-linea bg-paper p-1.5" aria-hidden="true">
            <FloorPlan model={model} floor={ground} labels={dict.rooms} dimensions={false} compact className="h-auto w-full" />
          </div>
          <p className="text-[0.82rem] leading-snug text-grafito">
            {dict.catalog.distribution}
            {model.floors.length > 1 ? `, ${dict.model.groundFloor.toLowerCase()}` : ""}
          </p>
        </div>

        <div className="mt-6 border-t border-linea pt-5">
          <ModelPrice surface={model.budgetSurface} labels={dict.catalog} />
          <p className="mt-2 text-[0.75rem] text-grafito">{dict.common.taxesNote}</p>
        </div>

        <div className="mt-6 grid gap-2 xs:grid-cols-2">
          <Link href={href(lang, routes.model(model.slug))} className="btn btn-secondary">
            {dict.common.viewHouse}
          </Link>
          <QuoteLink href={href(lang, routes.contact)} slug={model.slug} className="btn btn-primary" location="card">
            {dict.common.requestQuote}
          </QuoteLink>
        </div>
      </div>
    </article>
  );
}

export function customSurfaceText(dict: Dictionary, min: number, max: number) {
  return t(dict.catalog.customText, { min, max });
}
