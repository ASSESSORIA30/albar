"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { pricing, type Mode } from "@/content/pricing";
import { getModel } from "@/content/models";
import { estimate, clampSurface, type Estimate } from "./pricing";
import { readStorage, writeStorage } from "./storage";

const KEY = "albar-budget-v1";

interface BudgetState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  /** Modelo elegido; null = superficie personalizada. */
  slug: string | null;
  surface: number;
  selectModel: (slug: string | null) => void;
  setSurface: (m2: number) => void;
  estimate: Estimate;
  /** true cuando el usuario ha interactuado con el configurador. */
  touched: boolean;
}

const Ctx = createContext<BudgetState | null>(null);

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("kit");
  const [slug, setSlug] = useState<string | null>(null);
  const [surface, setSurfaceState] = useState<number>(pricing.surface.default);
  const [touched, setTouched] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  // Los efectos de los hijos (ficha de modelo, enlace con ?modelo=) se ejecutan antes que este:
  // lo que fijen no debe ser sobrescrito por lo guardado en el navegador.
  const dirty = useRef({ mode: false, selection: false });

  useEffect(() => {
    const raw = readStorage(KEY);
    if (raw) {
      try {
        const data = JSON.parse(raw) as { mode?: Mode; slug?: string | null; surface?: number; touched?: boolean };
        if (!dirty.current.mode && (data.mode === "kit" || data.mode === "assembly")) setModeState(data.mode);
        if (!dirty.current.selection) {
          if (typeof data.surface === "number") setSurfaceState(clampSurface(data.surface));
          if (data.slug === null || getModel(data.slug)) setSlug(data.slug ?? null);
        }
        if (data.touched) setTouched(true);
      } catch {
        /* datos corruptos: se ignoran */
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(KEY, JSON.stringify({ mode, slug, surface, touched }));
  }, [mode, slug, surface, touched, hydrated]);

  const setMode = useCallback((m: Mode) => {
    dirty.current.mode = true;
    setModeState(m);
    setTouched(true);
  }, []);

  const selectModel = useCallback((s: string | null) => {
    dirty.current.selection = true;
    setSlug(s);
    const model = getModel(s);
    if (model) setSurfaceState(model.budgetSurface);
    setTouched(true);
  }, []);

  /** Cambiar la superficie conserva el modelo elegido como base (se indica «superficie ajustada»). */
  const setSurface = useCallback((m2: number) => {
    dirty.current.selection = true;
    setSurfaceState(m2);
    setTouched(true);
  }, []);

  const value = useMemo<BudgetState>(
    () => ({ mode, setMode, slug, surface, selectModel, setSurface, estimate: estimate(surface, mode), touched }),
    [mode, setMode, slug, surface, selectModel, setSurface, touched],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBudget() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBudget fuera de BudgetProvider");
  return ctx;
}
