import type { Floor, HouseModel, Room, RoomKind } from "@/content/models";
import { roomArea } from "@/content/models";
import { num } from "@/lib/format";

const S = 36;
const EXT = 0.26; // espesor de muro exterior dibujado (m)
const INT = 0.06; // medio espesor de tabique (m)
const DOOR = 0.8;

interface Props {
  model: HouseModel;
  floor: Floor;
  labels: Record<RoomKind, string>;
  className?: string;
  title?: string;
  /** Muestra cotas generales. */
  dimensions?: boolean;
  compact?: boolean;
}

const circulation: RoomKind[] = ["corridor", "hall", "living"];

function roomLabel(room: Room, labels: Record<RoomKind, string>) {
  return labels[room.kind].replace("{n}", room.n ? String(room.n) : "").trim();
}

interface Door {
  x: number;
  y: number;
  orient: "v" | "h";
  /** Sentido hacia el que abre la hoja (+1 / -1 en el eje perpendicular). */
  dir: 1 | -1;
  leaf: boolean;
}

/** Busca un tramo de pared compartido entre dos estancias y coloca una puerta. */
function sharedDoor(a: Room, b: Room, leaf: boolean): Door | null {
  const e = 0.01;
  const overlap = (a0: number, a1: number, b0: number, b1: number) => [Math.max(a0, b0), Math.min(a1, b1)];
  // pared vertical
  if (Math.abs(a.x + a.w - b.x) < e || Math.abs(b.x + b.w - a.x) < e) {
    const [o0, o1] = overlap(a.y, a.y + a.d, b.y, b.y + b.d);
    if (o1 - o0 >= DOOR + 0.2) {
      const x = Math.abs(a.x + a.w - b.x) < e ? a.x + a.w : a.x;
      return { x, y: o0 + 0.15, orient: "v", dir: x === a.x ? 1 : -1, leaf };
    }
  }
  if (Math.abs(a.y + a.d - b.y) < e || Math.abs(b.y + b.d - a.y) < e) {
    const [o0, o1] = overlap(a.x, a.x + a.w, b.x, b.x + b.w);
    if (o1 - o0 >= DOOR + 0.2) {
      const y = Math.abs(a.y + a.d - b.y) < e ? a.y + a.d : a.y;
      return { x: o0 + 0.15, y, orient: "h", dir: y === a.y ? 1 : -1, leaf };
    }
  }
  return null;
}

function computeDoors(floor: Floor): Door[] {
  const doors: Door[] = [];
  const rooms = floor.rooms;
  const hasDressing = rooms.some((r) => r.kind === "dressing");
  for (const r of rooms) {
    if (r.kind === "living") continue;
    let targets: RoomKind[];
    if (r.kind === "dressing") targets = ["master"];
    else if (r.kind === "bath" && r.n === 1 && hasDressing) targets = ["master", "dressing"];
    else if (r.kind === "corridor" || r.kind === "hall") targets = ["living", "hall"];
    else targets = circulation;
    for (const kind of targets) {
      const found = rooms
        .filter((o) => o !== r && o.kind === kind)
        .map((o) => sharedDoor(r, o, !(r.kind === "corridor" || r.kind === "hall" || r.kind === "stair")))
        .find(Boolean);
      if (found) {
        doors.push(found);
        break;
      }
    }
  }
  return doors;
}

export function FloorPlan({ model, floor, labels, className, title, dimensions = true, compact = false }: Props) {
  const xs = floor.outline.flatMap((r) => [r.x, r.x + r.w]);
  const ys = floor.outline.flatMap((r) => [r.y, r.y + r.d]);
  const W = Math.max(...xs);
  const D = Math.max(...ys);
  const pad = dimensions ? 1.4 : 0.6;
  const vbW = (W + pad * 2) * S;
  const vbH = (D + pad * 2) * S;
  const X = (x: number) => (x + pad) * S;
  const Y = (y: number) => (y + pad) * S;
  const level = floor.level;
  const vols = model.volumes.filter((v) => Math.round(v.z / 3) === level);
  const doors = computeDoors(floor);
  const fs = compact ? 0.42 : 0.3;

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} className={className} role="img" aria-label={title}>
      {title ? <title>{title}</title> : null}
      <rect width={vbW} height={vbH} fill="var(--plan-bg, #FBFAF7)" />
      {/* muros: fondo oscuro, las estancias lo cubren dejando ver los tabiques */}
      {floor.outline.map((r, i) => (
        <rect key={i} x={X(r.x - EXT)} y={Y(r.y - EXT)} width={(r.w + EXT * 2) * S} height={(r.d + EXT * 2) * S} fill="var(--plan-ink, #2A2B28)" />
      ))}
      {floor.rooms.map((r, i) => (
        <rect
          key={i}
          x={X(r.x + INT)}
          y={Y(r.y + INT)}
          width={(r.w - INT * 2) * S}
          height={(r.d - INT * 2) * S}
          fill={r.kind === "corridor" || r.kind === "hall" ? "var(--plan-circ, #F1EDE5)" : "var(--plan-bg, #FBFAF7)"}
        />
      ))}

      {/* huecos en fachada */}
      {vols.flatMap((v, vi) => [
        ...v.openings.front.map((o, i) => (
          <WallOpening key={`f${vi}-${i}`} x={X(o.x)} y={Y(v.y + v.d - INT)} len={o.w * S} thick={(EXT + INT) * S} horizontal type={o.type} />
        )),
        ...v.openings.rear.map((o, i) => (
          <WallOpening key={`b${vi}-${i}`} x={X(o.x)} y={Y(v.y - EXT)} len={o.w * S} thick={(EXT + INT) * S} horizontal type={o.type} />
        )),
        ...v.openings.right.map((o, i) => (
          <WallOpening key={`r${vi}-${i}`} x={X(v.x + v.w - INT)} y={Y(o.x)} len={o.w * S} thick={(EXT + INT) * S} horizontal={false} type={o.type} />
        )),
      ])}

      {/* puertas interiores */}
      {doors.map((d, i) => {
        const gap = DOOR * S;
        const t = INT * 2 * S + 2;
        if (d.orient === "v") {
          const x = X(d.x) - t / 2;
          const y = Y(d.y);
          const hx = X(d.x);
          const sweep = d.dir;
          return (
            <g key={i}>
              <rect x={x} y={y} width={t} height={gap} fill="var(--plan-bg, #FBFAF7)" />
              {d.leaf ? (
                <>
                  <line x1={hx} y1={y} x2={hx + sweep * gap} y2={y} stroke="var(--plan-ink, #2A2B28)" strokeWidth={1.2} />
                  <path d={`M${hx + sweep * gap} ${y} A ${gap} ${gap} 0 0 ${sweep > 0 ? 1 : 0} ${hx} ${y + gap}`} fill="none" stroke="var(--plan-ink, #2A2B28)" strokeWidth={0.6} strokeDasharray="2 2" />
                </>
              ) : null}
            </g>
          );
        }
        const x = X(d.x);
        const y = Y(d.y) - t / 2;
        const hy = Y(d.y);
        const sweep = d.dir;
        return (
          <g key={i}>
            <rect x={x} y={y} width={gap} height={t} fill="var(--plan-bg, #FBFAF7)" />
            {d.leaf ? (
              <>
                <line x1={x} y1={hy} x2={x} y2={hy + sweep * gap} stroke="var(--plan-ink, #2A2B28)" strokeWidth={1.2} />
                <path d={`M${x} ${hy + sweep * gap} A ${gap} ${gap} 0 0 ${sweep > 0 ? 0 : 1} ${x + gap} ${hy}`} fill="none" stroke="var(--plan-ink, #2A2B28)" strokeWidth={0.6} strokeDasharray="2 2" />
              </>
            ) : null}
          </g>
        );
      })}

      {/* escalera */}
      {floor.rooms
        .filter((r) => r.kind === "stair")
        .map((r, i) => {
          const steps = Math.floor((r.w - 0.3) / 0.28);
          return (
            <g key={`st${i}`} stroke="var(--plan-ink, #2A2B28)" strokeWidth={0.7} opacity={0.55}>
              {Array.from({ length: steps }, (_, k) => (
                <line key={k} x1={X(r.x + 0.15 + k * 0.28)} y1={Y(r.y + 0.15)} x2={X(r.x + 0.15 + k * 0.28)} y2={Y(r.y + r.d * 0.5)} />
              ))}
              <line x1={X(r.x + 0.15)} y1={Y(r.y + r.d * 0.5)} x2={X(r.x + r.w - 0.15)} y2={Y(r.y + r.d * 0.5)} />
            </g>
          );
        })}

      {/* rótulos */}
      {floor.rooms.map((r, i) => {
        if (r.kind === "corridor") return null;
        const label = roomLabel(r, labels);
        const area = `${num(roomArea(r), 1)} m²`;
        const cx = X(r.x + r.w / 2);
        const cy = Y(r.y + (r.kind === "stair" ? r.d * 0.78 : r.d / 2));
        const maxW = (r.w - 0.3) * S;
        let size = fs * S;
        const est = label.length * size * 0.56;
        if (est > maxW) size = Math.max(7, (maxW / (label.length * 0.56)));
        return (
          <g key={`l${i}`} fill="var(--plan-ink, #2A2B28)" textAnchor="middle" fontFamily="var(--font-sans), system-ui, sans-serif">
            <text x={cx} y={cy} fontSize={size} fontWeight={500}>
              {label}
            </text>
            {r.kind !== "stair" ? (
              <text x={cx} y={cy + size * 1.35} fontSize={size * 0.86} opacity={0.6}>
                {area}
              </text>
            ) : null}
          </g>
        );
      })}

      {dimensions ? (
        <g stroke="var(--plan-ink, #2A2B28)" strokeWidth={0.8} fill="var(--plan-ink, #2A2B28)" fontFamily="var(--font-sans), system-ui, sans-serif" fontSize={0.3 * S}>
          <line x1={X(0)} y1={Y(-0.85)} x2={X(W)} y2={Y(-0.85)} />
          <line x1={X(0)} y1={Y(-1.05)} x2={X(0)} y2={Y(-0.65)} />
          <line x1={X(W)} y1={Y(-1.05)} x2={X(W)} y2={Y(-0.65)} />
          <text x={X(W / 2)} y={Y(-1.0)} textAnchor="middle" stroke="none">
            {num(W, 2)} m
          </text>
          <line x1={X(-0.85)} y1={Y(0)} x2={X(-0.85)} y2={Y(D)} />
          <line x1={X(-1.05)} y1={Y(0)} x2={X(-0.65)} y2={Y(0)} />
          <line x1={X(-1.05)} y1={Y(D)} x2={X(-0.65)} y2={Y(D)} />
          <text x={X(-1.0)} y={Y(D / 2)} textAnchor="middle" stroke="none" transform={`rotate(-90 ${X(-1.0)} ${Y(D / 2)})`}>
            {num(D, 2)} m
          </text>
        </g>
      ) : null}
    </svg>
  );
}

function WallOpening({
  x,
  y,
  len,
  thick,
  horizontal,
  type,
}: {
  x: number;
  y: number;
  len: number;
  thick: number;
  horizontal: boolean;
  type: "glazing" | "window" | "door";
}) {
  const w = horizontal ? len : thick;
  const h = horizontal ? thick : len;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="var(--plan-bg, #FBFAF7)" />
      {type !== "door" ? (
        horizontal ? (
          <>
            <line x1={x} y1={y + h * 0.42} x2={x + w} y2={y + h * 0.42} stroke="var(--plan-ink, #2A2B28)" strokeWidth={0.7} />
            <line x1={x} y1={y + h * 0.58} x2={x + w} y2={y + h * 0.58} stroke="var(--plan-ink, #2A2B28)" strokeWidth={0.7} />
          </>
        ) : (
          <>
            <line x1={x + w * 0.42} y1={y} x2={x + w * 0.42} y2={y + h} stroke="var(--plan-ink, #2A2B28)" strokeWidth={0.7} />
            <line x1={x + w * 0.58} y1={y} x2={x + w * 0.58} y2={y + h} stroke="var(--plan-ink, #2A2B28)" strokeWidth={0.7} />
          </>
        )
      ) : null}
      <rect
        x={x}
        y={y}
        width={horizontal ? 1.5 : w}
        height={horizontal ? h : 1.5}
        fill="var(--plan-ink, #2A2B28)"
      />
      <rect
        x={horizontal ? x + w - 1.5 : x}
        y={horizontal ? y : y + h - 1.5}
        width={horizontal ? 1.5 : w}
        height={horizontal ? h : 1.5}
        fill="var(--plan-ink, #2A2B28)"
      />
    </g>
  );
}
