/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PRECIOS Y CONDICIONES DE CÁLCULO
 *  Todos los importes de la web (tarjetas, fichas, configurador, PDF, WhatsApp,
 *  datos estructurados SEO) se calculan a partir de estos valores.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const pricing = {
  currency: "EUR" as const,

  /** Opción A — Kit de vivienda (incluye planos y transporte del kit). */
  kitPerM2: 700,

  /** Montaje opcional, que se suma al kit en la Opción B. */
  assemblyPerM2: 350,

  /** Límites del configurador para superficie personalizada. */
  surface: {
    min: 40,
    max: 400,
    step: 1,
    default: 120,
  },

  /**
   * Criterio de medición de la superficie presupuestada.
   *  - "pending": aún sin confirmar (se avisa en cada precio).
   *  - "built":   superficie construida.
   *  - "useful":  superficie útil.
   * Los textos de cada opción están en los diccionarios (pricing.criterion).
   */
  surfaceCriterion: "pending" as "pending" | "built" | "useful",

  /**
   * Impuestos. Los precios se muestran SIEMPRE sin impuestos.
   * Mientras `ratePercent` sea null, la web indica que los impuestos se
   * detallarán en el presupuesto definitivo, sin inventar ningún tipo.
   * Si se confirma un tipo, se añade una línea informativa con su importe.
   */
  taxes: {
    ratePercent: null as number | null,
    /** Nombre del impuesto cuando se confirme, p. ej. "IVA". */
    name: "" as string,
  },

  /** Días de validez del presupuesto orientativo. null = sin indicar. */
  estimateValidityDays: null as number | null,
};

export type Mode = "kit" | "assembly";
