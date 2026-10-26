"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useConsent } from "@/lib/consent";

const GA = process.env.NEXT_PUBLIC_GA4_ID || "";

export function ConsentBanner({
  labels,
  cookiesHref,
}: {
  labels: { title: string; text: string; accept: string; reject: string; more: string };
  cookiesHref: string;
}) {
  const { open, ready, set } = useConsent();
  return (
    <AnimatePresence>
      {ready && open ? (
        <motion.section
          role="region"
          aria-label={labels.title}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl bg-antracita p-4 text-cal sm:p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] md:bottom-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.24, 1] }}
          data-noprint
        >
          <p className="text-[0.84rem] leading-snug text-cal/85 sm:text-[0.92rem] sm:leading-relaxed">
            {labels.text}{" "}
            <Link href={cookiesHref} className="link text-cal">
              {labels.more}
            </Link>
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button type="button" className="btn btn-light min-h-11 px-3 text-[0.85rem]" onClick={() => set("granted")}>
              {labels.accept}
            </button>
            <button type="button" className="btn min-h-11 border border-cal/30 px-3 text-[0.85rem] text-cal hover:border-cal" onClick={() => set("denied")}>
              {labels.reject}
            </button>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}

/** Carga Google Analytics 4 solo con consentimiento y si hay ID configurado. */
export function AnalyticsLoader() {
  const { choice } = useConsent();
  const enabled = choice === "granted" && GA.length > 0;

  useEffect(() => {
    if (enabled) window.__albarAnalytics = true;
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" data-analytics="" />
      <Script id="ga4-init" strategy="afterInteractive" data-analytics="">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});window.__albarAnalytics=true;`}
      </Script>
    </>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  const { reopen } = useConsent();
  return (
    <button type="button" onClick={reopen} className="link text-left">
      {label}
    </button>
  );
}
