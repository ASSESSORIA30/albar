/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALCANCE DEL KIT: QUÉ ESTÁ INCLUIDO, QUÉ NO Y QUÉ ESTÁ PENDIENTE
 *
 *  status:
 *   - "included": incluido en el kit (Opción A y B).
 *   - "assembly": incluido solo si se contrata el montaje (Opción B).
 *   - "excluded": no incluido en ninguna modalidad.
 *   - "pending":  pendiente de confirmar en la ficha técnica / estudio técnico.
 *
 *  Para cambiar el estado de una partida, modifica solo `status` aquí:
 *  la sección «¿Qué incluye?», el configurador, las fichas y el PDF se actualizan.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ScopeStatus = "included" | "assembly" | "excluded" | "pending";

export interface ScopeItem {
  id: string;
  status: ScopeStatus;
  label: { es: string; ca: string };
  note?: { es: string; ca: string };
}

export const scope: ScopeItem[] = [
  // ── Incluido ──────────────────────────────────────────────────────────────
  {
    id: "kit",
    status: "included",
    label: {
      es: "Kit de construcción de hormigón celular",
      ca: "Kit de construcció de formigó cel·lular",
    },
    note: {
      es: "Componentes según la ficha técnica del producto.",
      ca: "Components segons la fitxa tècnica del producte.",
    },
  },
  {
    id: "plans",
    status: "included",
    label: { es: "Planos de la vivienda", ca: "Plànols de l'habitatge" },
    note: {
      es: "El alcance exacto de los planos se detalla en la ficha técnica.",
      ca: "L'abast exacte dels plànols es detalla a la fitxa tècnica.",
    },
  },
  {
    id: "transport",
    status: "included",
    label: { es: "Transporte del kit", ca: "Transport del kit" },
    note: {
      es: "Accesos, descarga y medios de elevación en obra se validan en el estudio técnico.",
      ca: "Accessos, descàrrega i mitjans d'elevació a l'obra es validen a l'estudi tècnic.",
    },
  },

  // ── Montaje (Opción B) ────────────────────────────────────────────────────
  {
    id: "assembly",
    status: "assembly",
    label: { es: "Montaje del kit", ca: "Muntatge del kit" },
    note: {
      es: "Mismo kit, montado por nuestro equipo. 350 €/m² adicionales.",
      ca: "El mateix kit, muntat pel nostre equip. 350 €/m² addicionals.",
    },
  },

  // ── No incluido ───────────────────────────────────────────────────────────
  {
    id: "electrical",
    status: "excluded",
    label: { es: "Instalación eléctrica", ca: "Instal·lació elèctrica" },
  },
  {
    id: "plumbing",
    status: "excluded",
    label: { es: "Fontanería y agua", ca: "Lampisteria i aigua" },
  },
  {
    id: "finishes",
    status: "excluded",
    label: {
      es: "Baldosas, pavimentos y revestimientos",
      ca: "Rajoles, paviments i revestiments",
    },
  },
  {
    id: "others",
    status: "excluded",
    label: {
      es: "Cualquier trabajo, instalación, acabado o componente no indicado expresamente en el alcance del kit",
      ca: "Qualsevol treball, instal·lació, acabat o component no indicat expressament a l'abast del kit",
    },
  },

  // ── Pendiente de confirmar ────────────────────────────────────────────────
  {
    id: "foundation",
    status: "pending",
    label: { es: "Cimentación", ca: "Fonamentació" },
  },
  {
    id: "roof",
    status: "pending",
    label: { es: "Cubierta", ca: "Coberta" },
  },
  {
    id: "joinery",
    status: "pending",
    label: { es: "Carpinterías exteriores", ca: "Fusteries exteriors" },
  },
  {
    id: "waterproofing",
    status: "pending",
    label: { es: "Impermeabilizaciones", ca: "Impermeabilitzacions" },
  },
  {
    id: "insulation",
    status: "pending",
    label: { es: "Aislamiento complementario", ca: "Aïllament complementari" },
  },
  {
    id: "otherInstallations",
    status: "pending",
    label: {
      es: "Otras instalaciones (climatización, ventilación, telecomunicaciones)",
      ca: "Altres instal·lacions (climatització, ventilació, telecomunicacions)",
    },
  },
  {
    id: "project",
    status: "pending",
    label: {
      es: "Proyecto técnico visado y dirección de obra",
      ca: "Projecte tècnic visat i direcció d'obra",
    },
  },
  {
    id: "permits",
    status: "pending",
    label: { es: "Licencias, permisos y tasas", ca: "Llicències, permisos i taxes" },
  },
  {
    id: "studies",
    status: "pending",
    label: {
      es: "Estudio geotécnico y topográfico",
      ca: "Estudi geotècnic i topogràfic",
    },
  },
  {
    id: "connections",
    status: "pending",
    label: {
      es: "Acometidas de servicios y urbanización de la parcela",
      ca: "Escomeses de serveis i urbanització de la parcel·la",
    },
  },
  {
    id: "taxes",
    status: "pending",
    label: { es: "Impuestos", ca: "Impostos" },
    note: {
      es: "Se indicarán por separado en el presupuesto definitivo.",
      ca: "S'indicaran per separat al pressupost definitiu.",
    },
  },
];

export function scopeBy(status: ScopeStatus) {
  return scope.filter((item) => item.status === status);
}
