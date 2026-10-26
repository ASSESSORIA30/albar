import type { Dictionary } from "@/content/i18n/es";
import type { Locale } from "@/content/site";
import { models } from "@/content/models";
import type { ConfiguratorLabels } from "@/components/home/Configurator";

export function configuratorLabels(dict: Dictionary, lang: Locale): ConfiguratorLabels {
  return {
    configurator: dict.configurator,
    common: dict.common,
    pricing: dict.pricing,
    pdf: dict.pdf,
    whatsapp: dict.whatsapp,
    modelNames: Object.fromEntries(models.map((m) => [m.slug, m.copy[lang].name])),
  };
}
