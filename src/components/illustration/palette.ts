import type { Finish } from "@/content/models";

/** Colores de las ilustraciones arquitectónicas (independientes del tema). */
export const ink = "#2A2B28";

export const finishes: Record<Finish, { face: string; side: string; top: string }> = {
  lime: { face: "#F4F0E8", side: "#DED7CA", top: "#FBF9F4" },
  sand: { face: "#E6D8BE", side: "#CDBC9D", top: "#F1E8D7" },
  stone: { face: "#DAD4C8", side: "#C0B8A9", top: "#E9E4DA" },
};

export const scenery = {
  skyTop: "#E3E7E4",
  skyBottom: "#F6F4EE",
  hills: "#DCDDD2",
  hillsFar: "#E6E7DF",
  ground: "#E7E0D2",
  gravel: "#DDD4C3",
  lawn: "#C9C6A6",
  olive: "#949A7A",
  oliveDark: "#7C8364",
  trunk: "#6E6457",
  cypress: "#5F6B50",
  cypressDark: "#4F5A43",
  lavender: "#A9A2BC",
  shadow: "rgba(42,43,40,0.14)",
  glassTop: "#56625F",
  glassBottom: "#2F3735",
  glassSky: "#9AA9A6",
  frame: "#2E2F2B",
  door: "#7A6853",
  slat: "#B9A27E",
};
