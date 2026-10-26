import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, href, routes, t, absoluteUrl } from "@/lib/i18n";
import { pageMetadata, JsonLd } from "@/lib/seo";
import { site, type Locale } from "@/content/site";
import { models, getModel, modelBounds, roomArea } from "@/content/models";
import { pricing } from "@/content/pricing";
import { estimate } from "@/lib/pricing";
import { euro, num } from "@/lib/format";
import { configuratorLabels } from "@/lib/labels";
import { ModelVisual } from "@/components/model/ModelVisual";
import { ModelCard } from "@/components/model/ModelCard";
import { programText } from "@/components/model/program";
import { ModelPrice } from "@/components/ui/ModelPrice";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { QuoteLink } from "@/components/ui/QuoteLink";
import { Gallery } from "@/components/ui/Gallery";
import { TrackView } from "@/components/ui/TrackView";
import { FloorPlan } from "@/components/illustration/FloorPlan";
import { Configurator } from "@/components/home/Configurator";
import { galleryItems } from "@/components/home/Sections";
import { scopeBy } from "@/content/scope";

type Props = { params: Promise<{ lang: Locale; slug: string }> };

export function generateStaticParams() {
  return site.locales.flatMap((lang) => models.map((m) => ({ lang, slug: m.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const model = getModel(slug);
  if (!model) return {};
  const d = getDictionary(lang);
  const c = model.copy[lang];
  const vars = {
    name: c.name,
    m2: model.budgetSurface,
    summary: c.summary,
    kit: euro(estimate(model.budgetSurface, "kit").subtotal),
    assembly: euro(estimate(model.budgetSurface, "assembly").subtotal),
  };
  return pageMetadata({ lang, path: routes.model(slug), title: t(d.meta.modelTitle, vars), description: t(d.meta.modelDescription, vars) });
}

export default async function ModelPage({ params }: Props) {
  const { lang, slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();
  const dict = getDictionary(lang);
  const c = model.copy[lang];
  const { W, D } = modelBounds(model);
  const items = galleryItems([model], lang, dict, ["front", "rear", "aerial", "plan"]);
  const others = models.filter((m) => m.slug !== slug);
  const url = absoluteUrl(lang, routes.model(slug));
  const kit = estimate(model.budgetSurface, "kit").subtotal;
  const full = estimate(model.budgetSurface, "assembly").subtotal;

  return (
    <article>
      <TrackView event="model_view" model={model.slug} />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${site.brand} ${c.name}`,
            description: c.description,
            brand: { "@type": "Brand", name: site.brand },
            category: "Kit de vivienda de hormigón celular",
            url,
            additionalProperty: [
              { "@type": "PropertyValue", name: dict.pricing.surfaceLabel, value: model.budgetSurface, unitCode: "MTK" },
              { "@type": "PropertyValue", name: dict.model.storeys, value: model.storeys },
            ],
            offers: [
              {
                "@type": "Offer",
                name: dict.common.kitOnly,
                price: kit,
                priceCurrency: pricing.currency,
                url,
                priceSpecification: { "@type": "PriceSpecification", price: kit, priceCurrency: pricing.currency, valueAddedTaxIncluded: false },
              },
              {
                "@type": "Offer",
                name: dict.common.kitAssembly,
                price: full,
                priceCurrency: pricing.currency,
                url,
                priceSpecification: { "@type": "PriceSpecification", price: full, priceCurrency: pricing.currency, valueAddedTaxIncluded: false },
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: dict.nav.home, item: absoluteUrl(lang, "/") },
              { "@type": "ListItem", position: 2, name: dict.model.breadcrumbs, item: absoluteUrl(lang, routes.models) },
              { "@type": "ListItem", position: 3, name: c.name, item: url },
            ],
          },
        ]}
      />

      <div className="shell pt-6">
        <nav aria-label="Breadcrumb" className="text-[0.85rem] text-grafito">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={href(lang, "/")} className="link">
                {dict.nav.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={href(lang, routes.models)} className="link">
                {dict.model.breadcrumbs}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-antracita">
              {c.name}
            </li>
          </ol>
        </nav>

        <header className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h1 className="display text-[3.5rem] sm:text-[5rem] lg:text-[7rem]">{c.name}</h1>
            <p className="lead mt-4 max-w-xl">{c.summary}</p>
          </div>
          <div className="lg:col-span-5">
            <p className="figure text-[1.1rem] text-grafito">
              {model.budgetSurface} m², {(model.storeys === 1 ? dict.common.floors1 : dict.common.floors2).toLowerCase()}
            </p>
            <div className="mt-4">
              <ModelPrice surface={model.budgetSurface} labels={dict.catalog} />
            </div>
            <ModeToggle labels={dict.common} size="sm" location="model" className="mt-5" />
            <p className="mt-3 text-[0.75rem] text-grafito">
              {dict.common.taxesNote} {dict.pricing.criterion[pricing.surfaceCriterion]}
            </p>
          </div>
        </header>

        <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#E9ECE9]">
          <ModelVisual model={model} view="front" alt={`${c.name}, ${dict.model.views.front}`} priority aspect={16 / 10} />
          <span className="absolute bottom-3 left-3 max-w-[80%] rounded-full bg-cal/85 px-3 py-1 text-[0.72rem] text-grafito backdrop-blur-sm">
            {dict.common.illustration}
          </span>
        </div>

        <div className="mt-6 grid gap-2 xs:grid-cols-2 sm:flex">
          <QuoteLink href={href(lang, routes.contact)} slug={model.slug} className="btn btn-primary" location="model_header">
            {dict.common.requestQuote}
          </QuoteLink>
          <Link href="#calcular" className="btn btn-secondary">
            {dict.common.calculate}
          </Link>
        </div>
      </div>

      <section className="shell grid gap-12 py-20 lg:grid-cols-12" aria-labelledby="datos">
        <div className="lg:col-span-7">
          <p className="prose-serif max-w-[62ch] text-[1.2rem] leading-relaxed">{c.description}</p>
          <h2 className="mt-10 text-[0.95rem] font-medium">{dict.model.highlights}</h2>
          <ul className="mt-3 divide-y divide-linea border-y border-linea">
            {c.highlights.map((h) => (
              <li key={h} className="py-3">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <h2 id="datos" className="text-[0.95rem] font-medium">
            {dict.model.specs}
          </h2>
          <dl className="mt-3 divide-y divide-linea border-y border-linea text-[0.95rem]">
            {[
              [dict.model.surface, `${model.budgetSurface} m²`],
              [dict.model.storeys, model.storeys === 1 ? dict.common.floors1 : dict.common.floors2],
              [dict.model.program, `${programText(model, dict)}${model.programValidated ? "" : ` (${dict.common.proposal.toLowerCase()})`}`],
              [dict.model.footprint, `${num(W, 2)} × ${num(D, 2)} m`],
              [dict.catalog.kitPrice, euro(kit)],
              [dict.catalog.assemblyPrice, euro(full)],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[1fr_auto] gap-4 py-3">
                <dt className="text-grafito">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
          {!model.programValidated ? <p className="mt-3 text-[0.8rem] text-grafito">{dict.model.programPending}</p> : null}
        </div>
      </section>

      <section className="shell" aria-labelledby="vistas">
        <h2 id="vistas" className="heading text-[2rem] sm:text-[2.6rem]">
          {dict.model.gallery}
        </h2>
        <p className="mt-2 text-[0.85rem] text-grafito">{dict.common.illustration}</p>
        <div className="mt-8">
          <Gallery
            items={items}
            columns="md:grid-cols-2"
            labels={{ ...dict.gallery, close: dict.common.close, previous: dict.common.previous, next: dict.common.next }}
          />
        </div>
      </section>

      <section className="shell py-20" aria-labelledby="plano">
        <h2 id="plano" className="heading text-[2rem] sm:text-[2.6rem]">
          {dict.model.views.plan}
        </h2>
        <p className="mt-2 text-[0.85rem] text-grafito">
          {dict.catalog.distribution}. {dict.model.roomsNote}
        </p>
        <div className={`mt-8 grid gap-6 ${model.floors.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {model.floors.map((f) => (
            <figure key={f.level} className="rounded-[1.25rem] border border-linea bg-paper p-4 sm:p-6">
              {model.floors.length > 1 ? (
                <figcaption className="mb-3 text-[0.9rem] font-medium">{f.level === 0 ? dict.model.groundFloor : dict.model.upperFloor}</figcaption>
              ) : null}
              <FloorPlan model={model} floor={f} labels={dict.rooms} title={`${c.name}, ${dict.model.views.plan}`} className="h-auto w-full" />
              <details className="mt-4">
                <summary className="min-h-10 cursor-pointer text-[0.9rem]">{dict.model.rooms}</summary>
                <table className="mt-2 w-full text-[0.88rem]">
                  <tbody className="divide-y divide-linea">
                    {f.rooms
                      .filter((r) => r.kind !== "corridor")
                      .map((r, i) => (
                        <tr key={i}>
                          <td className="py-1.5">{dict.rooms[r.kind].replace("{n}", r.n ? String(r.n) : "").trim()}</td>
                          <td className="figure py-1.5 text-right">{num(roomArea(r), 1)} m²</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </details>
            </figure>
          ))}
        </div>
      </section>

      <section id="calcular" className="bg-piedra/60 py-20 md:py-28" aria-labelledby="calc">
        <div className="shell">
          <h2 id="calc" className="display text-[2.25rem] sm:text-[3rem]">
            {t(dict.model.calculator, { name: c.name })}
          </h2>
          <div className="mt-10">
            <Configurator lang={lang} labels={configuratorLabels(dict, lang)} contactHref={href(lang, routes.contact)} lockModel={model.slug} />
          </div>
        </div>
      </section>

      <section className="shell py-20" aria-labelledby="alcance">
        <h2 id="alcance" className="heading text-[1.8rem]">
          {dict.kit.title}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <h3 className="text-[0.9rem] font-medium">{dict.kit.columns.included.title}</h3>
            <ul className="mt-2 space-y-1 text-[0.9rem] text-grafito">
              {scopeBy("included").map((i) => (
                <li key={i.id}>{i.label[lang]}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[0.9rem] font-medium">{dict.kit.columns.excluded.title}</h3>
            <ul className="mt-2 space-y-1 text-[0.9rem] text-grafito">
              {scopeBy("excluded").slice(0, 3).map((i) => (
                <li key={i.id}>{i.label[lang]}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[0.9rem] font-medium">{dict.kit.columns.pending.title}</h3>
            <p className="mt-2 text-[0.9rem] text-grafito">
              {scopeBy("pending")
                .slice(0, 4)
                .map((i) => i.label[lang])
                .join(", ")}
              …
            </p>
          </div>
        </div>
        <Link href={href(lang, routes.kit)} className="link mt-6 inline-flex min-h-11 items-center">
          {dict.common.seeScope}
        </Link>
      </section>

      <section className="shell pb-10" aria-labelledby="otros">
        <h2 id="otros" className="heading text-[2rem] sm:text-[2.6rem]">
          {dict.model.otherModels}
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-3">
          {others.map((m) => (
            <ModelCard key={m.slug} model={m} lang={lang} dict={dict} />
          ))}
        </div>
      </section>
    </article>
  );
}
