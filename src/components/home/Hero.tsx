"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { pricing } from "@/content/pricing";
import { num } from "@/lib/format";

interface Props {
  title: string;
  subtitle: string;
  caption: string;
  priceKitLabel: string;
  priceAssemblyLabel: string;
  exploreLabel: string;
  calculateLabel: string;
  exploreHref: string;
  calculateHref: string;
  taxesNote: string;
  scene: React.ReactNode;
  sceneMobile: React.ReactNode;
}

const ease = [0.22, 0.61, 0.24, 1] as const;

export function Hero(p: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0.35]);

  const words = p.title.split(" ");

  return (
    <section ref={ref} className="relative -mt-[var(--header-h)] flex flex-col overflow-hidden bg-[#E3E7E4] xl:min-h-[100svh]">
      <motion.div
        className="absolute inset-0 hidden xl:block"
        style={{ y: sceneY }}
        initial={reduce ? false : { scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
      >
        {p.scene}
      </motion.div>

      <motion.div style={{ opacity: fade }} className="shell relative z-10 flex flex-1 flex-col pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+3.5rem)] xl:pt-[calc(var(--header-h)+4.5rem)]">
        <h1 className="display max-w-[14ch] text-[3.1rem] xs:text-[3.5rem] sm:text-[4.75rem] lg:text-[5.5rem] 2xl:text-[6.5rem]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease }}
              >
                {w}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="lead mt-5 max-w-[30rem] text-antracita/80 sm:text-[1.3rem]"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
        >
          {p.subtitle}
        </motion.p>

        <motion.div
          className="relative -mx-5 mt-2 aspect-[4/3] md:-mx-10 md:aspect-[16/10] xl:hidden"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          {p.sceneMobile}
        </motion.div>

        <motion.div
          className="relative -mt-14 pb-6 md:-mt-24 xl:mt-auto xl:pb-10"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease }}
        >
          <div className="max-w-[34rem] rounded-[1.25rem] bg-cal/92 p-4 shadow-[0_24px_60px_-30px_rgba(42,43,40,0.45)] backdrop-blur-sm sm:p-5">
            <dl className="grid grid-cols-2 gap-4 border-b border-linea pb-4">
              <div>
                <dt className="text-[0.78rem] leading-snug text-grafito">{p.priceKitLabel}</dt>
                <dd className="figure mt-1 text-[1.85rem] leading-none sm:text-[2.2rem]">
                  {num(pricing.kitPerM2)} <span className="text-[0.55em] text-grafito">€/m²</span>
                </dd>
              </div>
              <div>
                <dt className="text-[0.78rem] leading-snug text-grafito">{p.priceAssemblyLabel}</dt>
                <dd className="figure mt-1 text-[1.85rem] leading-none sm:text-[2.2rem]">
                  {num(pricing.kitPerM2 + pricing.assemblyPerM2)} <span className="text-[0.55em] text-grafito">€/m²</span>
                </dd>
              </div>
            </dl>
            <div className="mt-4 grid gap-2 xs:grid-cols-2">
              <Link href={p.exploreHref} className="btn btn-secondary">
                {p.exploreLabel}
              </Link>
              <Link href={p.calculateHref} className="btn btn-primary">
                {p.calculateLabel}
              </Link>
            </div>
            <p className="mt-3 text-[0.72rem] leading-snug text-grafito">{p.taxesNote}</p>
          </div>
        </motion.div>
      </motion.div>

      <p className="absolute bottom-3 right-4 z-10 hidden text-[0.72rem] text-antracita/60 xl:block">{p.caption}</p>
    </section>
  );
}
