import localFont from "next/font/local";

export const archivo = localFont({
  src: "./fonts/archivo.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/newsreader-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});
