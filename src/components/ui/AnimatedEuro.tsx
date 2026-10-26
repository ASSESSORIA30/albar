"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";
import { euro } from "@/lib/format";

/** Importe en euros que transiciona suavemente al cambiar. */
export function AnimatedEuro({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce || prev.current === value) {
      node.textContent = euro(value);
      prev.current = value;
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 0.45,
      ease: [0.22, 0.61, 0.24, 1],
      onUpdate: (v) => {
        node.textContent = euro(Math.round(v));
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, reduce]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {euro(value)}
    </span>
  );
}
