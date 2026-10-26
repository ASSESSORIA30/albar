import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { archivo, newsreader } from "../fonts";
import { site, isLocale, type Locale } from "@/content/site";
import { getDictionary, href, routes, absoluteUrl } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBar } from "@/components/layout/StickyBar";
import { ConsentBanner, AnalyticsLoader } from "@/components/layout/Consent";
import { ConsentProvider } from "@/lib/consent";
import { BudgetProvider } from "@/lib/budget";
import { JsonLd } from "@/lib/seo";
import { getDictionary as gd } from "@/lib/i18n";

export function generateStaticParams() {
  return site.locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : site.defaultLocale;
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.brand} | ${site.tagline[locale]}`, template: `%s | ${site.brand}` },
    applicationName: site.brand,
    formatDetection: { telephone: false },
    icons: { icon: "/icon.svg", apple: "/icon.svg" },
  };
}

export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const langNames = Object.fromEntries(site.locales.map((l) => [l, gd(l).langName])) as Record<Locale, string>;
  const wa = { ...dict.whatsapp, kitOnly: dict.common.kitOnly, kitAssembly: dict.common.kitAssembly };

  return (
    <html lang={lang === "es" ? "es-ES" : "ca-ES"} className={`${archivo.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.legal.companyName || site.brand,
            brand: site.brand,
            url: absoluteUrl(lang, "/"),
            ...(site.contact.email ? { email: site.contact.email } : {}),
            ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-full focus:bg-antracita focus:px-4 focus:py-3 focus:text-cal"
        >
          {dict.nav.skip}
        </a>
        <ConsentProvider>
          <BudgetProvider>
            <Header lang={lang} labels={dict.nav} langNames={langNames} />
            <main id="main">{children}</main>
            <Footer lang={lang} dict={dict} />
            <StickyBar
              lang={lang}
              budgetHref={href(lang, routes.budget)}
              contactHref={href(lang, routes.contact)}
              labels={{ ...dict.stickyBar, kitOnly: dict.common.kitOnly, kitAssembly: dict.common.kitAssembly }}
              whatsapp={wa}
            />
            <ConsentBanner labels={dict.consent} cookiesHref={href(lang, routes.cookies)} />
            <AnalyticsLoader />
          </BudgetProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
