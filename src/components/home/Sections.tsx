import Link from "next/link";
import { Suspense } from "react";
import type { Dictionary } from "@/content/i18n/es";
import type { Locale } from "@/content/site";
import { models, type HouseModel } from "@/content/models";
import { pricing } from "@/content/pricing";
import { href, routes, t } from "@/lib/i18n";
import { configuratorLabels } from "@/lib/labels";
import { JsonLd } from "@/lib/seo";
import { SectionHead } from "@/components/ui/SectionHead";
import { ModelCard } from "@/components/model/ModelCard";
import { ModelVisual } from "@/components/model/ModelVisual";
import { Gallery, type GalleryItem } from "@/components/ui/Gallery";
import { SystemDiagram } from "@/components/illustration/SystemDiagram";
import { Configurator } from "./Configurator";
import { ModeCompare } from "./ModeCompare";
import { KitScope } from "./KitScope";
import { ProcessScroll } from "./ProcessScroll";
import { ContactForm } from "./ContactForm";

type P = { lang: Locale; dict: Dictionary };

export function AdvantagesSection({ lang, dict }: P) {
  const d = dict.advantages;
  return (
    <section className="shell py-24 md:py-32" aria-labelledby="ventajas">
      <SectionHead id="ventajas" title={d.title} intro={d.intro} />
      <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {d.items.map((item) => (
          <div key={item.title} className="border-t border-antracita pt-5">
            <h3 className="heading text-[1.3rem]">{item.title}</h3>
            <p className="prose-serif mt-3 text-grafito">{item.text}</p>
          </div>
        ))}
      </div>
      <Link href={href(lang, routes.material)} className="link mt-10 inline-flex min-h-11 items-center text-[0.95rem]">
        {d.link}
      </Link>
    </section>
  );
}

export function CatalogSection({ lang, dict, heading = "h2" }: P & { heading?: "h1" | "h2" }) {
  return (
    <section className="shell py-24 md:py-32" aria-labelledby="viviendas-title" id="viviendas">
      <SectionHead id="viviendas-title" as={heading} title={dict.catalog.title} intro={dict.catalog.intro}>
        <p className="mt-4 text-[0.82rem] leading-snug text-grafito">{dict.catalog.provisional}</p>
      </SectionHead>
      <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2">
        {models.map((m) => (
          <ModelCard key={m.slug} model={m} lang={lang} dict={dict} headingLevel={heading === "h1" ? "h2" : "h3"} />
        ))}
      </div>
      <div className="coursing mt-20 flex flex-col items-start justify-between gap-6 rounded-[1.25rem] border border-linea p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h3 className="heading text-[1.5rem]">{dict.catalog.customTitle}</h3>
          <p className="mt-1 text-grafito">{t(dict.catalog.customText, { min: pricing.surface.min, max: pricing.surface.max })}</p>
        </div>
        <Link href={href(lang, routes.budget)} className="btn btn-primary shrink-0">
          {dict.catalog.customCta}
        </Link>
      </div>
    </section>
  );
}

export function CompareSection({ dict }: P) {
  return (
    <section className="bg-piedra/60 py-24 md:py-32" aria-labelledby="modalidades">
      <div className="shell">
        <SectionHead id="modalidades" title={dict.compare.title} intro={dict.compare.intro} />
        <div className="mt-12">
          <ModeCompare labels={dict.compare} common={dict.common} />
        </div>
      </div>
    </section>
  );
}

export function ConfiguratorSection({ lang, dict, heading = "h2" }: P & { heading?: "h1" | "h2" }) {
  return (
    <section className="shell py-24 md:py-32" aria-labelledby="presupuesto" id="calculadora">
      <SectionHead id="presupuesto" as={heading} title={dict.configurator.title} intro={dict.configurator.intro} />
      <div className="mt-12">
        <Configurator lang={lang} labels={configuratorLabels(dict, lang)} contactHref={href(lang, routes.contact)} />
      </div>
    </section>
  );
}

export function KitSection({ lang, dict, heading = "h2", full = false }: P & { heading?: "h1" | "h2"; full?: boolean }) {
  return (
    <section className="shell py-24 md:py-32" aria-labelledby="kit">
      <SectionHead id="kit" as={heading} title={dict.kit.title} intro={dict.kit.intro} />
      <div className="mt-12">
        <KitScope lang={lang} dict={dict} />
      </div>
      <div className="mt-20 grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h3 className="heading text-[1.8rem] sm:text-[2.2rem]">{dict.kit.systemTitle}</h3>
          <p className="prose-serif mt-3 text-grafito">{dict.kit.systemIntro}</p>
          <ol className="mt-8 space-y-4">
            {dict.kit.systemLayers.map((layer, i) => (
              <li key={layer.title} className="grid grid-cols-[2rem_1fr] gap-2">
                <span className="figure flex h-6 w-6 items-center justify-center rounded-full bg-antracita text-[0.75rem] text-cal">{i + 1}</span>
                <div>
                  <p className="font-medium">{layer.title}</p>
                  <p className="mt-0.5 text-[0.9rem] leading-snug text-grafito">{layer.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-xl bg-piedra px-4 py-3 text-[0.85rem] leading-snug">{dict.kit.noClaims}</p>
        </div>
        <div className="lg:col-span-7">
          <SystemDiagram title={dict.kit.systemTitle} className="mx-auto w-full max-w-[38rem]" />
        </div>
      </div>
      {!full ? (
        <Link href={href(lang, routes.kit)} className="link mt-10 inline-flex min-h-11 items-center">
          {dict.common.seeScope}
        </Link>
      ) : null}
    </section>
  );
}

export function ProcessSection({ dict, heading = "h2" }: P & { heading?: "h1" | "h2" }) {
  return (
    <section className="shell pt-24 md:pt-32" aria-labelledby="proceso">
      <SectionHead id="proceso" as={heading} title={dict.process.title} intro={dict.process.intro} />
      <div className="mt-10">
        <ProcessScroll
          steps={dict.process.steps}
          stageLabels={dict.process.stageLabels}
          stageNote={dict.process.stageNote}
          noDates={dict.process.noDates}
          illustrationTitle={dict.process.title}
        />
      </div>
    </section>
  );
}

export function galleryItems(list: HouseModel[], lang: Locale, dict: Dictionary, views: ("front" | "rear" | "aerial" | "plan")[]) {
  const items: GalleryItem[] = [];
  for (const m of list) {
    for (const v of views) {
      const label = `${m.copy[lang].name}, ${dict.model.views[v].toLowerCase()}`;
      const visual = (
        <ModelVisual
          model={m}
          view={v}
          alt={label}
          roomLabels={dict.rooms}
          floorLabels={[dict.model.groundFloor, dict.model.upperFloor]}
          className="h-full w-full"
        />
      );
      items.push({
        id: `${m.slug}-${v}`,
        label,
        thumb: visual,
        aspect: v === "plan" && m.floors.length > 1 ? "aspect-[4/3]" : "aspect-[4/3]",
        tone: v === "plan" ? "bg-paper" : v === "aerial" ? "bg-[#E9E7DB]" : undefined,
      });
    }
  }
  return items;
}

export function GallerySection({ lang, dict }: P) {
  // Rejilla editorial de 12 celdas: una pieza grande (2×2) y ocho piezas sencillas.
  const items = [
    ...galleryItems(models, lang, dict, ["front", "aerial"]),
    ...galleryItems(models.slice(-1), lang, dict, ["plan"]),
  ];
  const lead = items.findIndex((i) => i.id === "tramuntana-front");
  if (lead > 0) items.unshift(...items.splice(lead, 1));
  items[0].wide = true;
  return (
    <section className="shell py-24 md:py-32" aria-labelledby="galeria">
      <SectionHead id="galeria" title={dict.gallery.title} intro={dict.gallery.intro} />
      <div className="mt-12">
        <Gallery
          items={items}
          labels={{ ...dict.gallery, close: dict.common.close, previous: dict.common.previous, next: dict.common.next }}
        />
      </div>
    </section>
  );
}

export function FaqSection({ dict }: P) {
  return (
    <section className="shell py-24 md:py-32" aria-labelledby="faq">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: dict.faq.items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <div className="grid gap-10 lg:grid-cols-12">
        <h2 id="faq" className="display text-[2.25rem] sm:text-[3rem] lg:col-span-4 lg:text-[3.5rem]">
          {dict.faq.title}
        </h2>
        <div className="divide-y divide-linea border-y border-linea lg:col-span-8">
          {dict.faq.items.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.05rem] [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:bg-antracita after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:bg-antracita after:transition-transform after:duration-300 group-open:after:scale-y-0"
                />
              </summary>
              <p className="prose-serif max-w-[62ch] pb-6 text-grafito">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ lang, dict, heading = "h2" }: P & { heading?: "h1" | "h2" }) {
  const labels = configuratorLabels(dict, lang);
  return (
    <section className="shell py-24 md:py-32" aria-labelledby="contacto-title" id="contacto">
      <SectionHead id="contacto-title" as={heading} title={dict.contact.title} intro={dict.contact.intro} />
      <div className="mt-12">
        <Suspense fallback={null}>
          <ContactForm
            lang={lang}
            labels={dict.contact}
            common={dict.common}
            configurator={dict.configurator}
            whatsapp={dict.whatsapp}
            privacyHref={href(lang, routes.privacy)}
            modelNames={labels.modelNames}
          />
        </Suspense>
      </div>
    </section>
  );
}
