import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, href, routes, absoluteUrl } from "@/lib/i18n";
import { pageMetadata, JsonLd } from "@/lib/seo";
import type { Locale } from "@/content/site";
import { site } from "@/content/site";
import { SystemDiagram } from "@/components/illustration/SystemDiagram";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/hormigon-celular", title: d.meta.materialTitle, description: d.meta.materialDescription });
}

export default async function MaterialPage({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const m = dict.material;
  return (
    <article className="pt-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: dict.meta.materialTitle,
          description: dict.meta.materialDescription,
          inLanguage: lang,
          publisher: { "@type": "Organization", name: site.legal.companyName || site.brand },
          mainEntityOfPage: absoluteUrl(lang, routes.material),
        }}
      />
      <header className="shell grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h1 className="display text-[3rem] sm:text-[4.5rem] lg:text-[6rem]">{m.title}</h1>
          <p className="lead mt-6 max-w-[38rem] sm:text-[1.3rem]">{m.lead}</p>
        </div>
        <div className="coursing hidden aspect-[5/4] rounded-[1.5rem] border border-linea lg:col-span-5 lg:block" aria-hidden="true" />
      </header>

      <section className="shell grid gap-10 pb-16 lg:grid-cols-12" aria-labelledby="que-es">
        <h2 id="que-es" className="heading text-[2rem] lg:col-span-4">
          {m.whatTitle}
        </h2>
        <div className="space-y-5 lg:col-span-8">
          {m.whatText.map((p) => (
            <p key={p} className="prose-serif max-w-[62ch] text-[1.15rem]">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-antracita py-16 text-cal md:py-20" aria-labelledby="distincion">
        <div className="shell grid gap-6 lg:grid-cols-12">
          <h2 id="distincion" className="heading text-[2rem] lg:col-span-4">
            {m.distinctionTitle}
          </h2>
          <p className="prose-serif max-w-[62ch] text-[1.15rem] text-cal/80 lg:col-span-8">{m.distinctionText}</p>
        </div>
      </section>

      <section className="shell py-16 md:py-24" aria-label={m.title}>
        <div className="hidden grid-cols-12 gap-6 border-b border-antracita pb-3 text-[0.85rem] text-grafito md:grid">
          <span className="col-span-4" />
          <span className="col-span-4">{m.labels.material}</span>
          <span className="col-span-4">{m.labels.building}</span>
        </div>
        {m.items.map((item) => (
          <div key={item.title} className="grid gap-3 border-b border-linea py-7 md:grid-cols-12 md:gap-6">
            <h3 className="heading text-[1.4rem] md:col-span-4">{item.title}</h3>
            <div className="md:col-span-4">
              <p className="text-[0.78rem] text-grafito md:hidden">{m.labels.material}</p>
              <p className="prose-serif mt-0.5">{item.material}</p>
            </div>
            <div className="md:col-span-4">
              <p className="text-[0.78rem] text-grafito md:hidden">{m.labels.building}</p>
              <p className="prose-serif mt-0.5 text-grafito">{item.building}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="shell grid items-center gap-10 pb-10 lg:grid-cols-12" aria-labelledby="normas">
        <div className="lg:col-span-5">
          <h2 id="normas" className="heading text-[1.8rem]">
            {m.standardsTitle}
          </h2>
          <p className="prose-serif mt-3 text-grafito">{m.standardsText}</p>
          <p className="mt-6 rounded-xl bg-piedra px-4 py-3 text-[0.85rem]">{dict.kit.noClaims}</p>
          <div className="mt-8 flex flex-col gap-2 xs:flex-row">
            <Link href={href(lang, routes.kit)} className="btn btn-primary">
              {m.cta}
            </Link>
            <Link href={href(lang, routes.models)} className="btn btn-secondary">
              {dict.common.exploreModels}
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7">
          <SystemDiagram title={dict.kit.systemTitle} className="mx-auto w-full max-w-[36rem]" />
        </div>
      </section>
    </article>
  );
}
