"use client";

/**
 * Analítica comercial sin datos personales.
 * Solo se envían eventos si el visitante ha aceptado la analítica y existe
 * NEXT_PUBLIC_GA4_ID. Las propiedades pasan por una lista blanca: nunca se
 * envían nombre, email, teléfono, mensaje ni provincia.
 */

export type AnalyticsEvent =
  | "model_view"
  | "configurator_model"
  | "configurator_surface"
  | "configurator_mode"
  | "budget_pdf_download"
  | "budget_request_click"
  | "whatsapp_click"
  | "lead_review"
  | "lead_submit_success"
  | "lead_submit_error";

type Props = { model?: string; surface_band?: string; mode?: string; location?: string; status?: string };

const ALLOWED: (keyof Props)[] = ["model", "surface_band", "mode", "location", "status"];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __albarAnalytics?: boolean;
  }
}

/** Agrupa la superficie en tramos para no enviar valores exactos. */
export function surfaceBand(m2: number) {
  if (m2 < 90) return "<90";
  if (m2 < 120) return "90-119";
  if (m2 < 150) return "120-149";
  if (m2 < 180) return "150-179";
  return "180+";
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined" || !window.__albarAnalytics || !window.gtag) return;
  const clean: Record<string, string> = {};
  for (const key of ALLOWED) {
    const value = props[key];
    if (typeof value === "string" && value.length < 40) clean[key] = value;
  }
  window.gtag("event", event, clean);
}
