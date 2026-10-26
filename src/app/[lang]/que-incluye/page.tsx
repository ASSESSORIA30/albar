import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, href, routes } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/site";
import { KitSection, CompareSection, FaqSection } from "@/components/home/Sections";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/que-incluye", title: d.meta.kitTitle, description: d.meta.kitDescription });
}

export default async function KitPage({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return (
    <div className="pt-4">
      <KitSection lang={lang} dict={dict} heading="h1" full />
      <CompareSection lang={lang} dict={dict} />
      <FaqSection lang={lang} dict={dict} />
      <div className="shell flex flex-col gap-2 xs:flex-row">
        <Link href={href(lang, routes.budget)} className="btn btn-primary">
          {dict.common.calculate}
        </Link>
        <Link href={href(lang, routes.models)} className="btn btn-secondary">
          {dict.common.exploreModels}
        </Link>
      </div>
    </div>
  );
}
