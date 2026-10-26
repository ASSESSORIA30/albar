import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand} · ${site.tagline.es}`,
    short_name: site.brand,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#F7F5F0",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
