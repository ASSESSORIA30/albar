"use client";

import { useBudget } from "@/lib/budget";
import { getModel } from "@/content/models";
import { euro } from "@/lib/format";
import { t } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import type { Locale } from "@/content/site";

export interface WhatsAppLabels {
  button: string;
  general: string;
  withEstimate: string;
  customModel: string;
  devHint: string;
  kitOnly: string;
  kitAssembly: string;
}

export function useWhatsAppMessage(labels: WhatsAppLabels, lang: Locale) {
  const { slug, surface, mode, estimate, touched } = useBudget();
  const model = getModel(slug);
  if (!touched && !model) return labels.general;
  return t(labels.withEstimate, {
    model: model ? model.copy[lang].name : labels.customModel,
    m2: surface,
    mode: mode === "assembly" ? labels.kitAssembly : labels.kitOnly,
    total: euro(estimate.subtotal),
  });
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3Z" />
    </svg>
  );
}

/** Enlace a WhatsApp con el modelo y presupuesto elegido. No se muestra si no hay número. */
export function WhatsAppLink({
  labels,
  lang,
  className,
  children,
  location,
}: {
  labels: WhatsAppLabels;
  lang: Locale;
  className?: string;
  children?: React.ReactNode;
  location: string;
}) {
  const message = useWhatsAppMessage(labels, lang);
  const url = whatsappUrl(message);
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <span className={`${className} cursor-help border border-dashed border-current opacity-60`} title={labels.devHint}>
          <WhatsAppIcon /> {labels.devHint}
        </span>
      );
    }
    return null;
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("whatsapp_click", { location })}
    >
      {children ?? (
        <>
          <WhatsAppIcon /> {labels.button}
        </>
      )}
    </a>
  );
}
