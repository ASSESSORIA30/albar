/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DATOS DE LA EMPRESA Y DE LA MARCA
 *  Este es el único archivo que hay que tocar para cambiar el nombre comercial,
 *  los datos de contacto y la información legal.
 *
 *  Todo valor que sea `null` o cadena vacía se considera PENDIENTE:
 *   · no se muestra al visitante como si fuera un dato real,
 *   · aparece marcado en /panel-datos y en las páginas legales.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  /** Nombre comercial provisional. Cámbialo aquí y se actualiza en toda la web. */
  brand: "Albar",
  /** Línea descriptiva que acompaña a la marca en cabecera, metadatos y PDF. */
  tagline: {
    es: "Casas de hormigón celular en kit",
    ca: "Cases de formigó cel·lular en kit",
  },

  /** URL pública. Se lee de NEXT_PUBLIC_SITE_URL para no duplicarla. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),

  contact: {
    /** Teléfono visible en la web, formato libre, p. ej. "+34 900 000 000". */
    phone: "" as string,
    /** Email comercial visible en la web. */
    email: "" as string,
    /** WhatsApp: se configura con NEXT_PUBLIC_WHATSAPP_NUMBER (sin "+" ni espacios). */
    whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
    /** Dirección de oficina o exposición, si existe. */
    address: "" as string,
    /** Horario de atención. */
    hours: "" as string,
  },

  /** Datos jurídicos para aviso legal y privacidad (LSSI-CE y RGPD). */
  legal: {
    companyName: "" as string, // Razón social
    taxId: "" as string, // NIF / CIF
    registeredAddress: "" as string, // Domicilio social
    registry: "" as string, // Datos de inscripción en el Registro Mercantil
    privacyEmail: "" as string, // Email para ejercer derechos RGPD
    dpoContact: "" as string, // Delegado de protección de datos (si procede)
    hostingProvider: "Vercel Inc." as string, // Proveedor de alojamiento
    lastUpdated: "" as string, // Fecha de última revisión de los textos legales
  },

  social: {
    instagram: "" as string,
    linkedin: "" as string,
    youtube: "" as string,
  },

  /** Idiomas. El primero es el idioma por defecto y no lleva prefijo en la URL. */
  locales: ["es", "ca"] as const,
  defaultLocale: "es" as const,
};

export type Locale = (typeof site.locales)[number];

export function isLocale(value: string): value is Locale {
  return (site.locales as readonly string[]).includes(value);
}
