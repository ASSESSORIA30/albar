"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import type { Locale } from "@/content/site";
import { site } from "@/content/site";
import { href, routes } from "@/lib/i18n";

interface Props {
  lang: Locale;
  labels: {
    models: string;
    budget: string;
    kit: string;
    process: string;
    material: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    cta: string;
    home: string;
  };
  langNames: Record<Locale, string>;
}

export function Header({ lang, labels, langNames }: Props) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const links = [
    { href: routes.models, label: labels.models },
    { href: routes.budget, label: labels.budget },
    { href: routes.kit, label: labels.kit },
    { href: routes.process, label: labels.process },
    { href: routes.material, label: labels.material },
    { href: routes.contact, label: labels.contact },
  ];

  // Ruta actual sin prefijo de idioma, para el selector de idioma.
  const bare = lang === site.defaultLocale ? pathname : pathname.replace(new RegExp(`^/${lang}`), "") || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = [buttonRef.current!, ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a,button"))];
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (path: string) => bare === path || bare.startsWith(`${path}/`);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-cal/92 shadow-[0_1px_0_var(--color-linea)] backdrop-blur-md" : "bg-cal/0"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        <Link href={href(lang, "/")} aria-label={`${site.brand}, ${labels.home}`} className="relative z-50 -m-2 p-2">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <Link
              key={l.href}
              href={href(lang, l.href)}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-[0.9rem] transition-colors hover:text-antracita ${
                isActive(l.href) ? "text-antracita" : "text-grafito"
              }`}
            >
              <span className={isActive(l.href) ? "border-b border-antracita pb-0.5" : ""}>{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch lang={lang} bare={bare} names={langNames} label={labels.language} />
          <Link href={href(lang, routes.budget)} className="btn btn-primary min-h-11 px-5 text-[0.875rem]">
            {labels.cta}
          </Link>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="relative z-50 -mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? labels.closeMenu : labels.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-antracita transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-antracita transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {mounted
        ? createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={labels.openMenu}
            className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-cal px-5 pb-8 lg:hidden"
            style={{ paddingTop: "calc(var(--header-h) + 1.5rem)" }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.24, 1] }}
          >
            <nav aria-label="Principal" className="flex flex-1 flex-col">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.35 }}
                >
                  <Link
                    href={href(lang, l.href)}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className="heading flex min-h-14 items-center border-b border-linea text-[1.65rem]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <Link href={href(lang, routes.budget)} onClick={() => setOpen(false)} className="btn btn-primary w-full">
                {labels.cta}
              </Link>
              <LangSwitch lang={lang} bare={bare} names={langNames} label={labels.language} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}

function LangSwitch({ lang, bare, names, label }: { lang: Locale; bare: string; names: Record<Locale, string>; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-1 text-[0.85rem]">
      {site.locales.map((l) => (
        <Link
          key={l}
          href={href(l, bare)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`flex min-h-10 min-w-10 items-center justify-center rounded-full px-2 ${
            l === lang ? "bg-piedra text-antracita" : "text-grafito hover:text-antracita"
          }`}
          title={names[l]}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
