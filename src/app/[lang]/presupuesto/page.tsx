import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/site";
import { ConfiguratorSection, CompareSection, FaqSection } from "@/components/home/Sections";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/presupuesto", title: d.meta.budgetTitle, description: d.meta.budgetDescription });
}

export default async function BudgetPage({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return (
    <div className="pt-4">
      <ConfiguratorSection lang={lang} dict={dict} heading="h1" />
      <CompareSection lang={lang} dict={dict} />
      <FaqSection lang={lang} dict={dict} />
    </div>
  );
}
