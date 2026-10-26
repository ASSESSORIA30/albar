"use client";

import { useBudget } from "@/lib/budget";
import { estimate, pricePerM2 } from "@/lib/pricing";
import { euro, num } from "@/lib/format";
import { t } from "@/lib/i18n";
import type { Dictionary } from "@/content/i18n/es";
import { ModeToggle } from "@/components/ui/ModeToggle";

type Row = { label: string; kit: boolean | "no"; assembly: boolean | "no" };

export function ModeCompare({
  labels,
  common,
  exampleM2 = 120,
}: {
  labels: Dictionary["compare"];
  common: Dictionary["common"];
  exampleM2?: number;
}) {
  const { mode } = useBudget();
  const rows: Row[] = [
    { label: labels.rows.kit, kit: true, assembly: true },
    { label: labels.rows.plans, kit: true, assembly: true },
    { label: labels.rows.transport, kit: true, assembly: true },
    { label: labels.rows.assembly, kit: false, assembly: true },
    { label: labels.rows.finished, kit: "no", assembly: "no" },
  ];
  const col = (m: "kit" | "assembly") => {
    const active = mode === m;
    const info = m === "kit" ? labels.kit : labels.assembly;
    return (
      <div
        className={`flex flex-col rounded-[1.25rem] border p-5 transition-colors duration-500 sm:p-7 ${
          active ? "border-antracita bg-paper" : "border-linea bg-transparent"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="heading text-[1.6rem]">{info.name}</h3>
          <p className="figure text-right text-[2rem] leading-none">
            {num(pricePerM2(m))}
            <span className="ml-1 text-[0.5em] text-grafito">€/m²</span>
          </p>
        </div>
        {m === "assembly" ? <p className="mt-1 text-right text-[0.78rem] text-grafito">{labels.assembly.breakdown}</p> : null}
        <p className="prose-serif mt-4 text-grafito">{info.text}</p>
        <ul className="mt-6 divide-y divide-linea border-y border-linea text-[0.92rem]">
          {rows.map((r) => {
            const v = r[m];
            return (
              <li key={r.label} className="flex min-h-12 items-center justify-between gap-4 py-2">
                <span className={v === true ? "" : "text-grafito"}>{r.label}</span>
                <span className={`shrink-0 text-[0.82rem] ${v === true ? "text-antracita" : "text-grafito"}`}>
                  {v === true ? (
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <path d="M2 7.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      {common.included}
                    </span>
                  ) : (
                    common.notIncluded
                  )}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto pt-6">
          <p className="text-[0.8rem] text-grafito">{t(labels.example, { m2: exampleM2 })}</p>
          <p className="figure mt-1 text-[1.6rem]">{euro(estimate(exampleM2, m).subtotal)}</p>
        </div>
      </div>
    );
  };
  return (
    <div>
      <ModeToggle labels={common} location="compare" className="mb-6" />
      <div className="grid gap-4 md:grid-cols-2">
        {col("kit")}
        {col("assembly")}
      </div>
      <p className="mt-5 max-w-2xl text-[0.85rem] text-grafito">
        {labels.notTurnkey} {common.taxesNote}
      </p>
    </div>
  );
}
