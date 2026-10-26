import { site } from "@/content/site";

/** Marca: tres hiladas de bloque desplazadas + nombre en Archivo expandido. */
export function Logo({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  const ink = inverted ? "#F7F5F0" : "#2A2B28";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 26 20" width="26" height="20" aria-hidden="true">
        <rect x="0" y="0" width="12" height="5.2" fill={ink} />
        <rect x="13.4" y="0" width="12.6" height="5.2" fill={ink} opacity="0.55" />
        <rect x="0" y="7.4" width="5.6" height="5.2" fill={ink} opacity="0.55" />
        <rect x="7" y="7.4" width="12" height="5.2" fill={ink} />
        <rect x="20.4" y="7.4" width="5.6" height="5.2" fill={ink} opacity="0.55" />
        <rect x="0" y="14.8" width="12" height="5.2" fill={ink} />
        <rect x="13.4" y="14.8" width="12.6" height="5.2" fill={ink} />
      </svg>
      <span className="text-[1.3rem] leading-none" style={{ fontStretch: "125%", fontWeight: 420, letterSpacing: "-0.02em", color: ink }}>
        {site.brand}
      </span>
    </span>
  );
}
