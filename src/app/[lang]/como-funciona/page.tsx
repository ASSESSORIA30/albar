import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, href, routes } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/site";
import { ProcessSection, ContactSection } from "@/components/home/Sections";

type Props = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return pageMetadata({ lang, path: "/como-funciona", title: d.meta.processTitle, description: d.meta.processDescription });
}

export default async function ProcessPage({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return (
    <div className="pt-4">
      <ProcessSection lang={lang} dict={dict} heading="h1" />
      <div className="shell mt-16">
        <p className="lead max-w-2xl">{dict.process.noDates}</p>
        <div className="mt-6 flex flex-col gap-2 xs:flex-row">
          <Link href={href(lang, routes.models)} className="btn btn-secondary">
            {dict.common.exploreModels}
          </Link>
          <Link href={href(lang, routes.budget)} className="btn btn-primary">
            {dict.common.calculate}
          </Link>
        </div>
      </div>
      <ContactSection lang={lang} dict={dict} />
    </div>
  );
}
