/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CATÁLOGO DE VIVIENDAS
 *
 *  Modelos ILUSTRATIVOS y PROVISIONALES. Sustitúyelos por los modelos
 *  comerciales reales editando este archivo:
 *
 *   · budgetSurface ........ superficie presupuestada (m²): de ella salen TODOS
 *                            los precios de la web.
 *   · bedrooms/bathrooms ... se muestran como «propuesta orientativa» mientras
 *                            `programValidated` sea false.
 *   · renders .............. rutas a imágenes reales en /public/renders. Si una
 *                            vista está vacía se muestra la ilustración generada
 *                            a partir de la geometría (marcada como orientativa).
 *   · volumes / floors ..... geometría en metros con la que se dibujan alzados,
 *                            vista elevada y planos. Coordenadas en planta:
 *                            x hacia la derecha, y hacia la fachada principal.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Locale } from "./site";

export type Finish = "lime" | "sand" | "stone";
export type OpeningType = "glazing" | "window" | "door";

export interface Opening {
  /** Posición horizontal en coordenadas de planta (x en fachadas principal/posterior, y en fachada lateral). */
  x: number;
  /** Altura del alféizar sobre la base del volumen. */
  z: number;
  w: number;
  h: number;
  type: OpeningType;
  /** Lamas verticales de protección solar en la ilustración. */
  shade?: boolean;
}

export interface Volume {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  /** Peto de cubierta plana. */
  parapet: number;
  finish: Finish;
  openings: { front: Opening[]; rear: Opening[]; right: Opening[] };
}

export type RoomKind =
  | "living"
  | "kitchen"
  | "bedroom"
  | "master"
  | "bath"
  | "toilet"
  | "hall"
  | "corridor"
  | "stair"
  | "laundry"
  | "dressing"
  | "study";

export interface Room {
  kind: RoomKind;
  n?: number;
  x: number;
  y: number;
  w: number;
  d: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  d: number;
}

export interface Floor {
  level: 0 | 1;
  outline: Rect[];
  rooms: Room[];
}

export interface ModelCopy {
  name: string;
  summary: string;
  description: string;
  highlights: string[];
}

export interface HouseModel {
  slug: string;
  budgetSurface: number;
  storeys: 1 | 2;
  bedrooms: number;
  bathrooms: number;
  /** true cuando el programa (dormitorios, baños, distribución) esté validado comercialmente. */
  programValidated: boolean;
  renders: { front?: string; rear?: string; aerial?: string; plan?: string };
  volumes: Volume[];
  floors: Floor[];
  copy: Record<Locale, ModelCopy>;
}


export const models: HouseModel[] = [
  // ───────────────────────────────────────────────────────────────── 90 m²
  {
    slug: "garbi",
    budgetSurface: 90,
    storeys: 1,
    bedrooms: 2,
    bathrooms: 1,
    programValidated: false,
    renders: {},
    volumes: [
      {
        x: 0, y: 0, z: 0, w: 12.5, d: 7.2, h: 3, parapet: 0.4, finish: "lime",
        openings: {
          front: [
            { x: 0.7, z: 0, w: 4.8, h: 2.5, type: "glazing" },
            { x: 6.8, z: 1.6, w: 1.1, h: 0.6, type: "window" },
            { x: 9.1, z: 0.8, w: 2.4, h: 1.5, type: "window", shade: true },
          ],
          rear: [
            { x: 1.2, z: 0.9, w: 3.0, h: 1.4, type: "window" },
            { x: 6.9, z: 1.5, w: 0.9, h: 0.7, type: "window" },
            { x: 9.6, z: 0.9, w: 1.8, h: 1.3, type: "window" },
          ],
          right: [
            { x: 2.85, z: 0, w: 1.0, h: 2.2, type: "door" },
            { x: 5.0, z: 0.9, w: 1.2, h: 1.3, type: "window" },
          ],
        },
      },
    ],
    floors: [
      {
        level: 0,
        outline: [{ x: 0, y: 0, w: 12.5, d: 7.2 }],
        rooms: [
          { kind: "living", x: 0, y: 0, w: 6.2, d: 7.2 },
          { kind: "bath", x: 6.2, y: 0, w: 2.3, d: 2.8 },
          { kind: "bedroom", n: 2, x: 8.5, y: 0, w: 4.0, d: 2.8 },
          { kind: "corridor", x: 6.2, y: 2.8, w: 6.3, d: 1.1 },
          { kind: "laundry", x: 6.2, y: 3.9, w: 2.3, d: 3.3 },
          { kind: "master", x: 8.5, y: 3.9, w: 4.0, d: 3.3 },
        ],
      },
    ],
    copy: {
      es: {
        name: "Garbí",
        summary: "Una planta compacta, con la zona de día abierta al jardín.",
        description:
          "Garbí ordena la vivienda en una sola planta rectangular: salón, comedor y cocina en un único espacio que se abre al exterior con un gran ventanal, y una zona de noche recogida al otro lado del pasillo. Una base sencilla y fácil de adaptar a parcelas de dimensiones contenidas.",
        highlights: [
          "Una planta, sin escaleras",
          "Zona de día de unos 45 m² abierta al jardín",
          "Volumen rectangular sencillo de transportar y montar",
        ],
      },
      ca: {
        name: "Garbí",
        summary: "Una planta compacta, amb la zona de dia oberta al jardí.",
        description:
          "Garbí ordena l'habitatge en una sola planta rectangular: sala, menjador i cuina en un únic espai que s'obre a l'exterior amb un gran finestral, i una zona de nit recollida a l'altra banda del passadís. Una base senzilla i fàcil d'adaptar a parcel·les de dimensions contingudes.",
        highlights: [
          "Una planta, sense escales",
          "Zona de dia d'uns 45 m² oberta al jardí",
          "Volum rectangular senzill de transportar i muntar",
        ],
      },
    },
  },

  // ──────────────────────────────────────────────────────────────── 120 m²
  {
    slug: "llevant",
    budgetSurface: 120,
    storeys: 1,
    bedrooms: 3,
    bathrooms: 2,
    programValidated: false,
    renders: {},
    volumes: [
      {
        x: 0, y: 0, z: 0, w: 14, d: 6.5, h: 3, parapet: 0.4, finish: "lime",
        openings: {
          front: [
            { x: 0.6, z: 0, w: 5.4, h: 2.5, type: "glazing" },
            { x: 7.2, z: 0, w: 1.0, h: 2.2, type: "door" },
          ],
          rear: [
            { x: 1.0, z: 0.9, w: 2.4, h: 1.4, type: "window" },
            { x: 7.3, z: 1.5, w: 0.8, h: 0.7, type: "window" },
            { x: 9.4, z: 0.9, w: 1.4, h: 1.3, type: "window" },
            { x: 12.0, z: 0.9, w: 1.4, h: 1.3, type: "window" },
          ],
          right: [],
        },
      },
      {
        x: 8.8, y: 6.5, z: 0, w: 5.2, d: 5.1, h: 3, parapet: 0.4, finish: "sand",
        openings: {
          front: [{ x: 9.6, z: 0, w: 3.6, h: 2.5, type: "glazing", shade: true }],
          rear: [],
          right: [{ x: 8.6, z: 0.9, w: 1.6, h: 1.3, type: "window" }],
        },
      },
    ],
    floors: [
      {
        level: 0,
        outline: [
          { x: 0, y: 0, w: 14, d: 6.5 },
          { x: 8.8, y: 6.5, w: 5.2, d: 5.1 },
        ],
        rooms: [
          { kind: "living", x: 0, y: 0, w: 6.6, d: 6.5 },
          { kind: "bath", n: 2, x: 6.6, y: 0, w: 2.2, d: 2.4 },
          { kind: "bedroom", n: 3, x: 8.8, y: 0, w: 2.6, d: 3.6 },
          { kind: "bedroom", n: 2, x: 11.4, y: 0, w: 2.6, d: 3.6 },
          { kind: "hall", x: 6.6, y: 2.4, w: 2.2, d: 4.1 },
          { kind: "corridor", x: 8.8, y: 3.6, w: 5.2, d: 1.2 },
          { kind: "bath", n: 1, x: 8.8, y: 4.8, w: 2.6, d: 2.4 },
          { kind: "dressing", x: 11.4, y: 4.8, w: 2.6, d: 2.4 },
          { kind: "master", x: 8.8, y: 7.2, w: 5.2, d: 4.4 },
        ],
      },
    ],
    copy: {
      es: {
        name: "Llevant",
        summary: "Planta en L que abraza el jardín y separa el día de la noche.",
        description:
          "Llevant organiza la vivienda en dos alas: un cuerpo principal con la zona de día y dos dormitorios, y un ala que avanza hacia el jardín con la suite principal, su baño y vestidor. La L genera un patio de uso privado y protege el exterior de vistas.",
        highlights: [
          "Una planta en L con patio protegido",
          "Suite principal con baño y vestidor",
          "Recibidor independiente",
        ],
      },
      ca: {
        name: "Llevant",
        summary: "Planta en L que abraça el jardí i separa el dia de la nit.",
        description:
          "Llevant organitza l'habitatge en dues ales: un cos principal amb la zona de dia i dos dormitoris, i una ala que avança cap al jardí amb la suite principal, el seu bany i vestidor. La L genera un pati d'ús privat i protegeix l'exterior de vistes.",
        highlights: [
          "Una planta en L amb pati protegit",
          "Suite principal amb bany i vestidor",
          "Rebedor independent",
        ],
      },
    },
  },

  // ──────────────────────────────────────────────────────────────── 150 m²
  {
    slug: "mestral",
    budgetSurface: 150,
    storeys: 2,
    bedrooms: 3,
    bathrooms: 2,
    programValidated: false,
    renders: {},
    volumes: [
      {
        x: 0, y: 0, z: 0, w: 10, d: 8, h: 3, parapet: 0.35, finish: "stone",
        openings: {
          front: [
            { x: 0.5, z: 0, w: 5.6, h: 2.6, type: "glazing" },
            { x: 6.9, z: 0, w: 1.0, h: 2.2, type: "door" },
            { x: 8.6, z: 1.5, w: 1.0, h: 0.7, type: "window" },
          ],
          rear: [
            { x: 1.0, z: 0.9, w: 3.0, h: 1.4, type: "window" },
            { x: 7.6, z: 1.0, w: 1.4, h: 1.2, type: "window" },
          ],
          right: [{ x: 2.9, z: 0.9, w: 1.4, h: 1.3, type: "window" }],
        },
      },
      {
        x: 0, y: 0, z: 3, w: 10, d: 7, h: 3, parapet: 0.4, finish: "lime",
        openings: {
          front: [
            { x: 0.8, z: 0, w: 3.0, h: 2.4, type: "glazing" },
            { x: 5.3, z: 0.9, w: 1.4, h: 1.3, type: "window", shade: true },
            { x: 8.0, z: 0.9, w: 1.4, h: 1.3, type: "window", shade: true },
          ],
          rear: [
            { x: 0.8, z: 1.5, w: 0.8, h: 0.7, type: "window" },
            { x: 3.1, z: 1.5, w: 0.8, h: 0.7, type: "window" },
            { x: 5.2, z: 1.5, w: 0.8, h: 0.7, type: "window" },
            { x: 7.6, z: 0.6, w: 1.4, h: 1.4, type: "window" },
          ],
          right: [{ x: 4.6, z: 0.9, w: 1.2, h: 1.3, type: "window" }],
        },
      },
    ],
    floors: [
      {
        level: 0,
        outline: [{ x: 0, y: 0, w: 10, d: 8 }],
        rooms: [
          { kind: "living", x: 0, y: 0, w: 6.6, d: 8 },
          { kind: "stair", x: 6.6, y: 0, w: 3.4, d: 2.4 },
          { kind: "study", x: 6.6, y: 2.4, w: 3.4, d: 2.6 },
          { kind: "hall", x: 6.6, y: 5.0, w: 1.6, d: 3.0 },
          { kind: "toilet", x: 8.2, y: 5.0, w: 1.8, d: 1.5 },
          { kind: "laundry", x: 8.2, y: 6.5, w: 1.8, d: 1.5 },
        ],
      },
      {
        level: 1,
        outline: [{ x: 0, y: 0, w: 10, d: 7 }],
        rooms: [
          { kind: "bath", n: 1, x: 0, y: 0, w: 2.4, d: 2.4 },
          { kind: "dressing", x: 2.4, y: 0, w: 2.2, d: 2.4 },
          { kind: "bath", n: 2, x: 4.6, y: 0, w: 2.0, d: 2.4 },
          { kind: "stair", x: 6.6, y: 0, w: 3.4, d: 2.4 },
          { kind: "master", x: 0, y: 2.4, w: 4.6, d: 4.6 },
          { kind: "corridor", x: 4.6, y: 2.4, w: 5.4, d: 1.2 },
          { kind: "bedroom", n: 2, x: 4.6, y: 3.6, w: 2.7, d: 3.4 },
          { kind: "bedroom", n: 3, x: 7.3, y: 3.6, w: 2.7, d: 3.4 },
        ],
      },
    ],
    copy: {
      es: {
        name: "Mestral",
        summary: "Dos plantas sobre una huella reducida, con terraza en la planta alta.",
        description:
          "Mestral concentra la vivienda en dos plantas para liberar parcela: abajo, la zona de día, un estudio y un aseo; arriba, tres dormitorios y dos baños. La planta alta retrocede respecto a la baja y deja una terraza orientada a la fachada principal.",
        highlights: [
          "Dos plantas y terraza en la planta alta",
          "Estudio en planta baja",
          "Huella de unos 80 m² en la parcela",
        ],
      },
      ca: {
        name: "Mestral",
        summary: "Dues plantes sobre una petjada reduïda, amb terrassa a la planta alta.",
        description:
          "Mestral concentra l'habitatge en dues plantes per alliberar parcel·la: a baix, la zona de dia, un estudi i un lavabo; a dalt, tres dormitoris i dos banys. La planta alta recula respecte de la baixa i deixa una terrassa orientada a la façana principal.",
        highlights: [
          "Dues plantes i terrassa a la planta alta",
          "Estudi a la planta baixa",
          "Petjada d'uns 80 m² a la parcel·la",
        ],
      },
    },
  },

  // ──────────────────────────────────────────────────────────────── 180 m²
  {
    slug: "tramuntana",
    budgetSurface: 180,
    storeys: 2,
    bedrooms: 4,
    bathrooms: 3,
    programValidated: false,
    renders: {},
    volumes: [
      {
        x: 0, y: 0, z: 0, w: 12, d: 8.5, h: 3, parapet: 0.35, finish: "sand",
        openings: {
          front: [
            { x: 0.5, z: 0, w: 6.0, h: 2.6, type: "glazing" },
            { x: 8.0, z: 0, w: 3.0, h: 2.4, type: "glazing" },
          ],
          rear: [
            { x: 1.2, z: 1.0, w: 2.2, h: 1.2, type: "window" },
            { x: 7.7, z: 1.5, w: 0.9, h: 0.7, type: "window" },
            { x: 10.1, z: 1.5, w: 0.9, h: 0.7, type: "window" },
          ],
          right: [
            { x: 2.4, z: 0, w: 1.0, h: 2.2, type: "door" },
            { x: 5.6, z: 0.9, w: 1.6, h: 1.3, type: "window" },
          ],
        },
      },
      {
        x: 0, y: 0, z: 3, w: 11, d: 7.1, h: 3, parapet: 0.4, finish: "lime",
        openings: {
          front: [
            { x: 0.7, z: 0, w: 3.2, h: 2.4, type: "glazing" },
            { x: 5.3, z: 0.9, w: 1.8, h: 1.3, type: "window", shade: true },
            { x: 8.5, z: 0.9, w: 1.8, h: 1.3, type: "window", shade: true },
          ],
          rear: [
            { x: 0.9, z: 1.5, w: 0.9, h: 0.7, type: "window" },
            { x: 3.2, z: 1.5, w: 0.8, h: 0.7, type: "window" },
            { x: 5.3, z: 0.5, w: 1.0, h: 1.6, type: "window" },
            { x: 8.5, z: 1.5, w: 1.2, h: 0.7, type: "window" },
          ],
          right: [{ x: 4.6, z: 0.9, w: 1.4, h: 1.3, type: "window" }],
        },
      },
    ],
    floors: [
      {
        level: 0,
        outline: [{ x: 0, y: 0, w: 12, d: 8.5 }],
        rooms: [
          { kind: "kitchen", x: 0, y: 0, w: 4.6, d: 3.6 },
          { kind: "stair", x: 4.6, y: 0, w: 2.4, d: 2.2 },
          { kind: "laundry", x: 7.0, y: 0, w: 2.2, d: 2.2 },
          { kind: "bath", n: 3, x: 9.2, y: 0, w: 2.8, d: 2.2 },
          { kind: "hall", x: 4.6, y: 2.2, w: 7.4, d: 1.4 },
          { kind: "living", x: 0, y: 3.6, w: 7.0, d: 4.9 },
          { kind: "bedroom", n: 4, x: 7.0, y: 3.6, w: 5.0, d: 4.9 },
        ],
      },
      {
        level: 1,
        outline: [{ x: 0, y: 0, w: 11, d: 7.1 }],
        rooms: [
          { kind: "bath", n: 1, x: 0, y: 0, w: 2.6, d: 2.4 },
          { kind: "dressing", x: 2.6, y: 0, w: 2.0, d: 2.4 },
          { kind: "stair", x: 4.6, y: 0, w: 2.4, d: 2.2 },
          { kind: "bath", n: 2, x: 7.0, y: 0, w: 4.0, d: 2.2 },
          { kind: "master", x: 0, y: 2.4, w: 4.6, d: 4.7 },
          { kind: "corridor", x: 4.6, y: 2.2, w: 6.4, d: 1.2 },
          { kind: "bedroom", n: 2, x: 4.6, y: 3.4, w: 3.2, d: 3.7 },
          { kind: "bedroom", n: 3, x: 7.8, y: 3.4, w: 3.2, d: 3.7 },
        ],
      },
    ],
    copy: {
      es: {
        name: "Tramuntana",
        summary: "La casa familiar: cuatro dormitorios y una planta baja muy abierta.",
        description:
          "Tramuntana reparte 180 m² en dos plantas. En la baja, cocina independiente, un gran salón-comedor hacia el jardín y un dormitorio que puede funcionar como habitación de invitados o despacho. En la alta, la suite principal y dos dormitorios más, con terraza sobre la fachada principal.",
        highlights: [
          "Cuatro dormitorios, uno de ellos en planta baja",
          "Cocina independiente",
          "Terraza en planta alta",
        ],
      },
      ca: {
        name: "Tramuntana",
        summary: "La casa familiar: quatre dormitoris i una planta baixa molt oberta.",
        description:
          "Tramuntana reparteix 180 m² en dues plantes. A la baixa, cuina independent, una gran sala-menjador cap al jardí i un dormitori que pot funcionar com a habitació de convidats o despatx. A l'alta, la suite principal i dos dormitoris més, amb terrassa sobre la façana principal.",
        highlights: [
          "Quatre dormitoris, un d'ells a la planta baixa",
          "Cuina independent",
          "Terrassa a la planta alta",
        ],
      },
    },
  },
];

export function getModel(slug: string | null | undefined) {
  return models.find((m) => m.slug === slug);
}

/** Superficie aproximada de cada estancia (orientativa, sin descontar tabiques). */
export function roomArea(room: Room) {
  return Math.round(room.w * room.d * 10) / 10;
}

export function modelBounds(model: HouseModel) {
  const W = Math.max(...model.volumes.map((v) => v.x + v.w));
  const D = Math.max(...model.volumes.map((v) => v.y + v.d));
  const H = Math.max(...model.volumes.map((v) => v.z + v.h + v.parapet));
  return { W, D, H };
}
