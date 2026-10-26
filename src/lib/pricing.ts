import { pricing, type Mode } from "../content/pricing.ts";

export interface Estimate {
  surface: number;
  mode: Mode;
  kit: number;
  assembly: number;
  /** Total sin impuestos. */
  subtotal: number;
  /** Importe de impuestos si el tipo está confirmado; null mientras esté pendiente. */
  tax: number | null;
  /** Total con impuestos si el tipo está confirmado; null mientras esté pendiente. */
  totalWithTax: number | null;
}

export function clampSurface(value: number) {
  if (!Number.isFinite(value)) return pricing.surface.min;
  return Math.min(pricing.surface.max, Math.max(pricing.surface.min, Math.round(value)));
}

export function isValidSurface(value: number) {
  return Number.isFinite(value) && value >= pricing.surface.min && value <= pricing.surface.max;
}

/**
 * precioKit      = superficie × kitPerM2
 * precioMontaje  = superficie × assemblyPerM2  (solo si mode === "assembly")
 * subtotal       = precioKit + precioMontaje
 */
export function estimate(surface: number, mode: Mode): Estimate {
  const kit = surface * pricing.kitPerM2;
  const assembly = mode === "assembly" ? surface * pricing.assemblyPerM2 : 0;
  const subtotal = kit + assembly;
  const rate = pricing.taxes.ratePercent;
  const tax = rate === null ? null : Math.round(subtotal * rate) / 100;
  return {
    surface,
    mode,
    kit,
    assembly,
    subtotal,
    tax,
    totalWithTax: tax === null ? null : subtotal + tax,
  };
}

export function pricePerM2(mode: Mode) {
  return mode === "assembly" ? pricing.kitPerM2 + pricing.assemblyPerM2 : pricing.kitPerM2;
}
