"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { t } from "@/lib/i18n";

export interface GalleryItem {
  id: string;
  label: string;
  /** Contenido de la miniatura (ilustración o imagen). */
  thumb: React.ReactNode;
  /** Contenido ampliado; por defecto, la misma miniatura. */
  full?: React.ReactNode;
  /** Clase de proporción de la miniatura. */
  aspect?: string;
  wide?: boolean;
  tone?: string;
}

interface Labels {
  open: string;
  dialog: string;
  counter: string;
  close: string;
  previous: string;
  next: string;
}

export function Gallery({ items, labels, columns = "md:grid-cols-3" }: { items: GalleryItem[]; labels: Labels; columns?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const open = (i: number, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setIndex(i);
  };
  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (index !== null && !dlg.open) dlg.showModal();
    if (index === null && dlg.open) {
      dlg.close();
      lastTrigger.current?.focus();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = index === null ? null : items[index];

  return (
    <>
      <ul className={`grid grid-cols-2 gap-3 sm:gap-4 ${columns}`}>
        {items.map((item, i) => (
          <li key={item.id} className={item.wide ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              aria-label={t(labels.open, { label: item.label })}
              className={`group relative block w-full overflow-hidden rounded-2xl ${item.tone ?? "bg-[#E9ECE9]"} ${item.wide ? "h-full min-h-[14rem]" : (item.aspect ?? "aspect-[4/3]")}`}
            >
              <span className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-arch)] group-hover:scale-[1.03]">
                {item.thumb}
              </span>
              <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] rounded-full bg-cal/88 px-2.5 py-1 text-left text-[0.7rem] leading-tight text-antracita backdrop-blur-sm sm:bottom-3 sm:left-3 sm:text-[0.78rem]">
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={labels.dialog}
        onClose={close}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-antracita/96 p-0 text-cal backdrop:bg-antracita/80"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-[0.9rem]">
                {current.label}
                <span className="ml-3 text-cal/50">{t(labels.counter, { i: (index ?? 0) + 1, n: items.length })}</span>
              </p>
              <button type="button" onClick={close} className="btn min-h-11 border border-cal/30 px-4 text-cal hover:border-cal" autoFocus>
                {labels.close}
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  className={`relative max-h-full w-full max-w-6xl overflow-hidden rounded-xl ${current.tone ?? "bg-[#E9ECE9]"} ${current.aspect ?? "aspect-[4/3]"}`}
                  style={{ maxHeight: "calc(100svh - 9rem)" }}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.25 }}
                >
                  {current.full ?? current.thumb}
                </motion.div>
              </AnimatePresence>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={labels.previous}
                className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cal/30 hover:border-cal sm:flex"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={labels.next}
                className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cal/30 hover:border-cal sm:flex"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center gap-3 px-4 pb-5 pt-3 sm:hidden">
              <button type="button" onClick={() => go(-1)} className="btn min-h-12 flex-1 border border-cal/30 text-cal">
                {labels.previous}
              </button>
              <button type="button" onClick={() => go(1)} className="btn min-h-12 flex-1 border border-cal/30 text-cal">
                {labels.next}
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
