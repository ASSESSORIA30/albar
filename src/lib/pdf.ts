"use client";

import { site } from "@/content/site";
import { euro } from "./format";
import type { Estimate } from "./pricing";

export interface PdfInput {
  lang: string;
  labels: {
    title: string;
    date: string;
    reference: string;
    model: string;
    surface: string;
    mode: string;
    breakdown: string;
    total: string;
    included: string;
    excluded: string;
    pending: string;
    footer: string;
    filename: string;
  };
  modelName: string;
  modeName: string;
  estimate: Estimate;
  rows: { label: string; value: string }[];
  included: string[];
  excluded: string[];
  pending: string[];
  notes: string[];
  tagline: string;
}

/** Genera la ficha PDF orientativa en el navegador (jsPDF se carga bajo demanda). */
const c = (s: string) => s.replace(/\u00b2/g, "2").replace(/\u00a0/g, " ").replace(/\u2212/g, "-").replace(/\u2026/g, "...");

export async function downloadEstimatePdf(input: PdfInput) {
  const { jsPDF } = await import("jspdf");
  const raw = new jsPDF({ unit: "mm", format: "a4" });
  // Normaliza caracteres fuera de WinAnsi (espacios duros, signo menos) en todos los textos.
  const originalText = raw.text.bind(raw);
  raw.text = ((text: string | string[], x: number, y: number, options?: object) =>
    originalText(Array.isArray(text) ? text.map(c) : c(text), x, y, options)) as typeof raw.text;
  const doc = raw;
  const W = 210;
  const M = 18;
  const ink: [number, number, number] = [42, 43, 40];
  const grey: [number, number, number] = [91, 90, 84];
  const line: [number, number, number] = [217, 210, 196];
  let y = M;

  const now = new Date();
  const ref = `${site.brand.slice(0, 3).toUpperCase()}-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate(),
  ).padStart(2, "0")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  // Cabecera
  doc.setFillColor(247, 245, 240);
  doc.rect(0, 0, W, 42, "F");
  doc.setTextColor(...ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(site.brand, M, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...grey);
  doc.text(input.tagline, M, y + 12);
  doc.setFontSize(9);
  doc.text(`${input.labels.date}: ${now.toLocaleDateString(input.lang === "ca" ? "ca-ES" : "es-ES")}`, W - M, y + 6, { align: "right" });
  doc.text(`${input.labels.reference}: ${ref}`, W - M, y + 12, { align: "right" });
  y = 56;

  doc.setTextColor(...ink);
  doc.setFontSize(20);
  doc.text(input.labels.title, M, y);
  y += 10;

  const kv = (k: string, v: string) => {
    doc.setFontSize(10);
    doc.setTextColor(...grey);
    doc.text(k, M, y);
    doc.setTextColor(...ink);
    doc.text(v, M + 55, y);
    y += 6.5;
  };
  kv(input.labels.model, input.modelName);
  kv(input.labels.surface, `${input.estimate.surface} m²`);
  kv(input.labels.mode, input.modeName);
  y += 4;

  // Desglose
  doc.setFontSize(12);
  doc.text(input.labels.breakdown, M, y);
  y += 4;
  doc.setDrawColor(...line);
  doc.line(M, y, W - M, y);
  y += 6;
  doc.setFontSize(10);
  for (const row of input.rows) {
    doc.setTextColor(...ink);
    doc.text(row.label, M, y);
    doc.text(row.value, W - M, y, { align: "right" });
    y += 4;
    doc.line(M, y, W - M, y);
    y += 6;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(input.labels.total, M, y + 1);
  doc.text(euro(input.estimate.subtotal).replace(" ", " "), W - M, y + 1, { align: "right" });
  doc.setFont("helvetica", "normal");
  y += 10;

  doc.setFontSize(8.5);
  doc.setTextColor(...grey);
  for (const note of input.notes) {
    const lines = doc.splitTextToSize(note, W - M * 2);
    doc.text(lines, M, y);
    y += lines.length * 4 + 1.5;
  }
  y += 4;

  const list = (title: string, items: string[]) => {
    if (!items.length) return;
    if (y > 250) {
      doc.addPage();
      y = M;
    }
    doc.setFontSize(10.5);
    doc.setTextColor(...ink);
    doc.text(title, M, y);
    y += 5.5;
    doc.setFontSize(9);
    doc.setTextColor(...grey);
    for (const item of items) {
      const lines = doc.splitTextToSize(`–  ${item}`, W - M * 2 - 4);
      if (y + lines.length * 4 > 280) {
        doc.addPage();
        y = M;
      }
      doc.text(lines, M + 2, y);
      y += lines.length * 4 + 1;
    }
    y += 4;
  };
  list(input.labels.included, input.included);
  list(input.labels.excluded, input.excluded);
  list(input.labels.pending, input.pending);

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(...grey);
    doc.text(`${input.labels.footer}  ${site.url.replace(/^https?:\/\//, "")}`, M, 290);
    doc.text(`${i}/${pages}`, W - M, 290, { align: "right" });
  }

  doc.save(`${input.labels.filename}-${input.estimate.surface}m2.pdf`);
}
