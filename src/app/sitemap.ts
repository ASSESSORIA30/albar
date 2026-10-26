import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { models } from "@/content/models";
import { absoluteUrl, routes } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: routes.models, priority: 0.9 },
    ...models.map((m) => ({ path: routes.model(m.slug), priority: 0.8 })),
    { path: routes.budget, priority: 0.9 },
    { path: routes.kit, priority: 0.8 },
    { path: routes.process, priority: 0.6 },
    { path: routes.material, priority: 0.6 },
    { path: routes.contact, priority: 0.7 },
    { path: routes.legal, priority: 0.1 },
    { path: routes.privacy, priority: 0.1 },
    { path: routes.cookies, priority: 0.1 },
  ];
  const now = new Date();
  return paths.map(({ path, priority }) => ({
    url: absoluteUrl(site.defaultLocale, path),
    lastModified: now,
    priority,
    alternates: {
      languages: Object.fromEntries(site.locales.map((l) => [l === "es" ? "es-ES" : "ca-ES", absoluteUrl(l, path)])),
    },
  }));
}
