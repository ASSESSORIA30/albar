"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { readStorage, writeStorage } from "./storage";

type Choice = "granted" | "denied" | null;
const KEY = "albar-consent-v1";

interface ConsentState {
  choice: Choice;
  ready: boolean;
  set: (choice: "granted" | "denied") => void;
  reopen: () => void;
  open: boolean;
}

const Ctx = createContext<ConsentState | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readStorage(KEY);
    const value = stored === "granted" || stored === "denied" ? stored : null;
    setChoice(value);
    setOpen(value === null);
    setReady(true);
  }, []);

  const set = useCallback((value: "granted" | "denied") => {
    setChoice(value);
    setOpen(false);
    writeStorage(KEY, value);
    if (value === "denied" && typeof window !== "undefined") {
      window.__albarAnalytics = false;
      // Si se retira el consentimiento, se recarga para descargar los scripts de analítica.
      if (document.querySelector("script[data-analytics]")) window.location.reload();
    }
  }, []);

  const reopen = useCallback(() => setOpen(true), []);

  return <Ctx.Provider value={{ choice, ready, set, reopen, open }}>{children}</Ctx.Provider>;
}

export function useConsent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConsent fuera de ConsentProvider");
  return ctx;
}
