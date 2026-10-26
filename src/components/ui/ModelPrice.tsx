"use client";

import { useBudget } from "@/lib/budget";
import { estimate } from "@/lib/pricing";
import { euro } from "@/lib/format";

/** Precio de un modelo en ambas modalidades, resaltando la elegida globalmente. */
export function ModelPrice({
  surface,
  labels,
  layout = "row",
}: {
  surface: number;
  labels: { kitPrice: string; assemblyPrice: string };
  layout?: "row" | "stack";
}) {
  const { mode } = useBudget();
  const kit = estimate(surface, "kit").subtotal;
  const full = estimate(surface, "assembly").subtotal;
  const item = (label: string, value: number, active: boolean) => (
    <div className={`transition-opacity duration-300 ${active ? "opacity-100" : "opacity-45"}`}>
      <dt className="text-[0.8rem] text-grafito">{label}</dt>
      <dd className={`figure ${active ? "text-[1.45rem]" : "text-[1.15rem]"} leading-tight transition-all duration-300`}>{euro(value)}</dd>
    </div>
  );
  return (
    <dl className={layout === "row" ? "flex items-end gap-6" : "grid gap-3"}>
      {item(labels.kitPrice, kit, mode === "kit")}
      {item(labels.assemblyPrice, full, mode === "assembly")}
    </dl>
  );
}
