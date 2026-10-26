import type { Metadata } from "next";
import { getDictionary, href, routes, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site, type Locale } from "@/content/site";
import { getModel } from "@/content/models";
import { Hero } from "@/components/home/Hero";
import { Elevation } from "@/components/illustration/Elevation";
import {
  AdvantagesSection,
  CatalogSection,
  CompareSection,
  ConfiguratorSection,
  KitSection,
  ProcessSection,
  GallerySection,
  FaqSection,
  ContactSection,
} from "@/components/home/Sections";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/", title: `${site.brand} | ${d.meta.homeTitle}`, description: d.meta.homeDescription, absoluteTitle: true });
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const heroModel = getModel("tramuntana")!;

  return (
    <>
      <Hero
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        caption={t(dict.hero.caption, { name: heroModel.copy[lang].name, m2: heroModel.budgetSurface })}
        priceKitLabel={dict.hero.priceKit}
        priceAssemblyLabel={dict.hero.priceAssembly}
        exploreLabel={dict.common.exploreModels}
        calculateLabel={dict.common.calculate}
        exploreHref={href(lang, routes.models)}
        calculateHref={href(lang, routes.budget)}
        taxesNote={dict.common.taxesNote}
        scene={
          <Elevation
            model={heroModel}
            view="front"
            margins={{ left: 10, right: 1.4, sky: 5.6 }}
            className="h-full w-full"
            preserveAspectRatio="xMaxYMax slice"
            title={t(dict.hero.caption, { name: heroModel.copy[lang].name, m2: heroModel.budgetSurface })}
            idPrefix="hero-"
          />
        }
        sceneMobile={
          <Elevation
            model={heroModel}
            view="front"
            sideMargin={1.6}
            aspect={4 / 3}
            className="h-full w-full"
            preserveAspectRatio="xMidYMax slice"
            title={t(dict.hero.caption, { name: heroModel.copy[lang].name, m2: heroModel.budgetSurface })}
            idPrefix="herom-"
          />
        }
      />
      <AdvantagesSection lang={lang} dict={dict} />
      <CatalogSection lang={lang} dict={dict} />
      <CompareSection lang={lang} dict={dict} />
      <ConfiguratorSection lang={lang} dict={dict} />
      <KitSection lang={lang} dict={dict} />
      <ProcessSection lang={lang} dict={dict} />
      <GallerySection lang={lang} dict={dict} />
      <FaqSection lang={lang} dict={dict} />
      <ContactSection lang={lang} dict={dict} />
    </>
  );
}
