"use client";

import { useBudget } from "@/lib/budget";
import { track } from "@/lib/analytics";
import type { Mode } from "@/content/pricing";

/** Selector global «Solo kit / Kit + montaje»: actualiza todos los precios de la web. */
export function ModeToggle({
  labels,
  size = "md",
  location,
  className = "",
  legend,
}: {
  labels: { kitOnly: string; kitAssembly: string };
  size?: "sm" | "md";
  location: string;
  className?: string;
  legend?: string;
}) {
  const { mode, setMode } = useBudget();
  const options: { value: Mode; label: string }[] = [
    { value: "kit", label: labels.kitOnly },
    { value: "assembly", label: labels.kitAssembly },
  ];
  return (
    <div
      role="radiogroup"
      aria-label={legend ?? `${labels.kitOnly} / ${labels.kitAssembly}`}
      className={`relative inline-grid grid-cols-2 rounded-full bg-piedra p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-antracita transition-transform duration-300 ease-[var(--ease-arch)]"
        style={{ transform: mode === "assembly" ? "translateX(100%)" : "translateX(0)" }}
      />
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={mode === o.value}
          onClick={() => {
            setMode(o.value);
            track("configurator_mode", { mode: o.value, location });
          }}
          className={`relative z-10 whitespace-nowrap rounded-full font-medium transition-colors duration-300 ${
            size === "sm" ? "min-h-10 px-4 text-[0.85rem]" : "min-h-12 px-5 text-[0.95rem]"
          } ${mode === o.value ? "text-cal" : "text-grafito hover:text-antracita"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
