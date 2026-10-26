import type { Metadata } from "next";
import { site, type Locale } from "@/content/site";
import { absoluteUrl } from "./i18n";

export function pageMetadata({
  lang,
  path,
  title,
  description,
  noindex = false,
  absoluteTitle = false,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const languages = Object.fromEntries(site.locales.map((l) => [l === "es" ? "es-ES" : "ca-ES", absoluteUrl(l, path)]));
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: absoluteUrl(lang, path),
      languages: { ...languages, "x-default": absoluteUrl(site.defaultLocale, path) },
    },
    openGraph: {
      type: "website",
      siteName: site.brand,
      locale: lang === "es" ? "es_ES" : "ca_ES",
      url: absoluteUrl(lang, path),
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

/** Inserta datos estructurados JSON-LD de forma segura. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
