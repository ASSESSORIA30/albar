import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/site";
import { LegalDoc } from "@/components/ui/LegalDoc";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/aviso-legal", title: d.meta.legalTitle, description: d.meta.legalTitle });
}

export default async function LegalNoticePage({ params }: Props) {
  const { lang } = await params;
  const d = getDictionary(lang);
  return <LegalDoc title={d.meta.legalTitle} sections={d.legal.legalNotice} pendingMark={d.legal.pendingMark} updatedLabel={d.legal.updated} />;
}
