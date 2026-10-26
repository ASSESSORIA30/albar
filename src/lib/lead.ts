import { z } from "zod";
import { pricing } from "@/content/pricing";
import { provinces, OTHER_PROVINCE } from "@/content/provinces";
import { models } from "@/content/models";

const slugs = models.map((m) => m.slug) as [string, ...string[]];

/** Esquema compartido por el formulario (cliente) y la API (servidor). */
export const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .max(25)
    .refine((v) => v.replace(/\D/g, "").length >= 9, "phone"),
  email: z.string().trim().toLowerCase().email().max(160),
  province: z.enum([...provinces, OTHER_PROVINCE] as [string, ...string[]]),
  model: z.union([z.enum(slugs), z.literal("")]),
  surface: z.coerce.number().int().min(pricing.surface.min).max(pricing.surface.max),
  mode: z.enum(["kit", "assembly"]),
  land: z.enum(["yes", "no", "searching"]),
  message: z.string().trim().max(2000).optional().default(""),
  consent: z.literal(true),
  lang: z.enum(["es", "ca"]).default("es"),
  // Antispam
  website: z.string().max(0).optional().default(""), // honeypot: debe llegar vacío
  startedAt: z.coerce.number().int().positive(),
  turnstileToken: z.string().max(4096).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadErrorCode = "validation" | "rate_limited" | "spam" | "not_configured" | "delivery_failed";
export interface LeadResponse {
  ok: boolean;
  id?: string;
  error?: LeadErrorCode;
  fields?: string[];
  /** Canales que han funcionado (email, crm). */
  delivered?: string[];
}
