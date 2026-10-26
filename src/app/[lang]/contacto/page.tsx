import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/site";
import { ContactSection } from "@/components/home/Sections";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/contacto", title: d.meta.contactTitle, description: d.meta.contactDescription });
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return (
    <div className="pt-4">
      <ContactSection lang={lang} dict={dict} heading="h1" />
    </div>
  );
}
