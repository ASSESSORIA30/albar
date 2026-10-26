"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Registra un evento de analítica al montar (p. ej., visita a un modelo). */
export function TrackView({ event, model }: { event: AnalyticsEvent; model?: string }) {
  useEffect(() => {
    // pequeño retraso para que el script de analítica (si hay consentimiento) esté listo
    const id = window.setTimeout(() => track(event, { model }), 1200);
    return () => window.clearTimeout(id);
  }, [event, model]);
  return null;
}
