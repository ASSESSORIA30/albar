import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/site";
import { CatalogSection, CompareSection, ContactSection } from "@/components/home/Sections";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/casas", title: d.meta.catalogTitle, description: d.meta.catalogDescription });
}

export default async function CatalogPage({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return (
    <div className="pt-6">
      <CatalogSection lang={lang} dict={dict} heading="h1" />
      <CompareSection lang={lang} dict={dict} />
      <ContactSection lang={lang} dict={dict} />
    </div>
  );
}
