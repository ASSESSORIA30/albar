"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBudget } from "@/lib/budget";
import { euro } from "@/lib/format";
import { getModel } from "@/content/models";
import type { Locale } from "@/content/site";
import { WhatsAppLink, WhatsAppIcon, type WhatsAppLabels } from "./WhatsApp";
import { whatsappUrl } from "@/lib/whatsapp";

interface Props {
  lang: Locale;
  budgetHref: string;
  contactHref: string;
  labels: { text: string; cta: string; info: string; kitOnly: string; kitAssembly: string };
  whatsapp: WhatsAppLabels;
}

/** Barra fija inferior en móvil y botón flotante de WhatsApp en escritorio. */
export function StickyBar({ lang, budgetHref, contactHref, labels, whatsapp }: Props) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname() || "";
  const { touched, estimate, slug, mode } = useBudget();
  const model = getModel(slug);
  const hide = pathname.endsWith("/presupuesto") || pathname.endsWith("/contacto");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasWa = Boolean(whatsappUrl("x"));

  return (
    <>
      <AnimatePresence>
        {visible && !hide ? (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-30 border-t border-linea bg-cal/95 backdrop-blur-md md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.24, 1] }}
            data-noprint
          >
            <div className="flex items-center gap-2 px-3 py-2.5">
              <div className="min-w-0 flex-1 pl-1">
                {touched ? (
                  <>
                    <p className="truncate text-[0.75rem] text-grafito">
                      {model ? `${model.copy[lang].name}, ` : ""}
                      {mode === "assembly" ? labels.kitAssembly : labels.kitOnly}
                    </p>
                    <p className="figure text-[1.05rem] leading-tight">{euro(estimate.subtotal)}</p>
                  </>
                ) : (
                  <p className="text-[0.85rem] leading-tight text-grafito">{labels.text}</p>
                )}
              </div>
              {hasWa ? (
                <WhatsAppLink labels={whatsapp} lang={lang} location="sticky" className="btn btn-secondary h-11 min-h-11 w-11 px-0">
                  <WhatsAppIcon />
                  <span className="sr-only">{whatsapp.button}</span>
                </WhatsAppLink>
              ) : null}
              <Link href={touched ? contactHref : budgetHref} className="btn btn-primary min-h-11 px-4 text-[0.875rem]">
                {touched ? labels.info : labels.cta}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {hasWa ? (
        <div className="fixed bottom-6 right-6 z-30 hidden md:block" data-noprint>
          <WhatsAppLink
            labels={whatsapp}
            lang={lang}
            location="floating"
            className="btn h-14 w-14 bg-[#25D366] px-0 text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] hover:bg-[#1fbf5b]"
          >
            <WhatsAppIcon className="h-6 w-6" />
            <span className="sr-only">{whatsapp.button}</span>
          </WhatsAppLink>
        </div>
      ) : null}
    </>
  );
}
