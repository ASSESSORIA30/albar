import { es, type Dictionary } from "@/content/i18n/es";
import { ca } from "@/content/i18n/ca";
import { site, type Locale } from "@/content/site";

const dictionaries: Record<Locale, Dictionary> = { es, ca };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[site.defaultLocale];
}

/** Sustituye {marcadores} en un texto. */
export function t(text: string, vars: Record<string, string | number> = {}) {
  return text.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : key === "brand" ? site.brand : match,
  );
}

/** Ruta localizada: español sin prefijo, resto con /<locale>. */
export function href(locale: Locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === site.defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

export function absoluteUrl(locale: Locale, path = "/") {
  return `${site.url}${href(locale, path)}`;
}

export const routes = {
  home: "/",
  models: "/casas",
  model: (slug: string) => `/casas/${slug}`,
  budget: "/presupuesto",
  kit: "/que-incluye",
  process: "/como-funciona",
  material: "/hormigon-celular",
  contact: "/contacto",
  legal: "/aviso-legal",
  privacy: "/privacidad",
  cookies: "/cookies",
  panel: "/panel-datos",
} as const;
