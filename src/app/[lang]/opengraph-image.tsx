import { ImageResponse } from "next/og";
import { site, isLocale } from "@/content/site";
import { getDictionary } from "@/lib/i18n";
import { pricing } from "@/content/pricing";
import { num } from "@/lib/format";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.brand}`;

export function generateStaticParams() {
  return site.locales.map((lang) => ({ lang }));
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const d = getDictionary(isLocale(lang) ? lang : "es");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F7F5F0", padding: 72, color: "#2A2B28" }}>
        <div style={{ display: "flex", fontSize: 34, letterSpacing: -1 }}>{site.brand}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, lineHeight: 1, letterSpacing: -3, maxWidth: 900 }}>{d.hero.title}</div>
          <div style={{ fontSize: 30, marginTop: 28, color: "#5B5A54", maxWidth: 900 }}>{d.hero.subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 48, fontSize: 30 }}>
          <div style={{ display: "flex" }}>{`${num(pricing.kitPerM2)} €/m² · ${d.common.kitOnly}`}</div>
          <div style={{ display: "flex" }}>{`${num(pricing.kitPerM2 + pricing.assemblyPerM2)} €/m² · ${d.common.kitAssembly}`}</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 18, background: "#C9B48F", display: "flex" }} />
      </div>
    ),
    size,
  );
}
