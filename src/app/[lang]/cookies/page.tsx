import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/site";
import { LegalDoc } from "@/components/ui/LegalDoc";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/cookies", title: d.meta.cookiesTitle, description: d.meta.cookiesTitle });
}

export default async function CookiesPage({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return <LegalDoc title={d.meta.cookiesTitle} sections={d.legal.cookies} pendingMark={d.legal.pendingMark} updatedLabel={d.legal.updated} />;
}
