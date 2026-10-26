import type { HouseModel, Opening, Volume } from "@/content/models";
import { modelBounds } from "@/content/models";
import { finishes, scenery } from "./palette";

const S = 40; // px por metro

interface Props {
  model: HouseModel;
  view: "front" | "rear";
  /** Incluye cielo, colinas y jardín. */
  scene?: boolean;
  /** Margen lateral de escena en metros. */
  sideMargin?: number;
  className?: string;
  title?: string;
  preserveAspectRatio?: string;
  idPrefix?: string;
  /** Relación ancho/alto deseada: se añade cielo o margen lateral para encajar sin recortar la casa. */
  aspect?: number;
  /** Márgenes y cielo explícitos (en metros) para composiciones asimétricas como la portada. */
  margins?: { left: number; right: number; sky: number };
}

interface Placed {
  v: Volume;
  x0: number;
  openings: Opening[];
  depth: number;
}

function place(model: HouseModel, view: "front" | "rear"): Placed[] {
  const { W } = modelBounds(model);
  return model.volumes
    .map((v) => {
      if (view === "front") {
        return { v, x0: v.x, openings: v.openings.front, depth: v.y + v.d };
      }
      return {
        v,
        x0: W - (v.x + v.w),
        openings: v.openings.rear.map((o) => ({ ...o, x: W - (o.x + o.w) })),
        depth: -v.y,
      };
    })
    .sort((a, b) => a.depth - b.depth || a.v.z - b.v.z);
}

export function Elevation({
  model,
  view,
  scene = true,
  sideMargin = 5.5,
  className,
  title,
  preserveAspectRatio = "xMidYMid meet",
  idPrefix = "",
  aspect,
  margins,
}: Props) {
  const { W, H } = modelBounds(model);
  const id = `${idPrefix}${model.slug}-${view}`;
  let mx = scene ? sideMargin : 0.6;
  let top = scene ? 3.2 : 0.6;
  const bottom = scene ? (aspect ? 1.1 : 1.9) : 0.4;
  if (aspect) {
    const t = (W + 2 * mx) / aspect - H - bottom;
    if (t >= 1.2) top = t;
    else {
      top = 1.2;
      mx = ((H + top + bottom) * aspect - W) / 2;
    }
  }
  const mL = margins ? margins.left : mx;
  const mR = margins ? margins.right : mx;
  if (margins) top = margins.sky;
  const vbW = (W + mL + mR) * S;
  const vbH = (H + top + bottom) * S;
  const gx = (x: number) => (x + mL) * S;
  const gy = (z: number) => (top + H - z) * S;
  const groundY = gy(0);
  const placed = place(model, view);
  const mirror = view === "rear";

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      role="img"
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={scenery.skyTop} />
          <stop offset="1" stopColor={scenery.skyBottom} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={scenery.glassSky} />
          <stop offset="0.38" stopColor={scenery.glassTop} />
          <stop offset="1" stopColor={scenery.glassBottom} />
        </linearGradient>
        <linearGradient id={`${id}-wash`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#000" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id={`${id}-contact`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A2B28" stopOpacity="0.22" />
          <stop offset="1" stopColor="#2A2B28" stopOpacity="0" />
        </linearGradient>
      </defs>

      {scene ? (
        <g>
          <rect width={vbW} height={groundY} fill={`url(#${id}-sky)`} />
          <path
            d={`M0 ${groundY - 1.4 * S} C ${vbW * 0.2} ${groundY - 3.1 * S}, ${vbW * 0.38} ${groundY - 1.2 * S}, ${vbW * 0.55} ${groundY - 2.3 * S} S ${vbW * 0.86} ${groundY - 1.1 * S}, ${vbW} ${groundY - 2.6 * S} V ${groundY} H 0 Z`}
            fill={scenery.hillsFar}
          />
          <path
            d={`M0 ${groundY - 0.7 * S} C ${vbW * 0.25} ${groundY - 1.6 * S}, ${vbW * 0.5} ${groundY - 0.5 * S}, ${vbW * 0.7} ${groundY - 1.3 * S} S ${vbW * 0.95} ${groundY - 0.6 * S}, ${vbW} ${groundY - 1.0 * S} V ${groundY} H 0 Z`}
            fill={scenery.hills}
          />
          <rect y={groundY} width={vbW} height={vbH - groundY} fill={scenery.lawn} />
          <rect y={groundY} width={vbW} height={0.22 * S} fill={scenery.ground} />
          <Tree kind="olive" x={gx(mirror ? W + 2.6 : -2.6)} y={groundY} />
          <Tree kind="cypress" x={gx(mirror ? -1.3 : W + 1.3)} y={groundY} h={6.2} />
          <Tree kind="cypress" x={gx(mirror ? -2.4 : W + 2.4)} y={groundY} h={4.9} />
        </g>
      ) : null}

      {/* contacto con el terreno */}
      <rect x={gx(-0.3)} y={groundY} width={(W + 0.6) * S} height={0.35 * S} fill={`url(#${id}-contact)`} />

      {placed.map((p, i) => {
        const f = finishes[p.v.finish];
        const x = gx(p.x0);
        const w = p.v.w * S;
        const yTop = gy(p.v.z + p.v.h + p.v.parapet);
        const h = (p.v.h + p.v.parapet) * S;
        const behind = placed.slice(0, i).some(
          (q) => q.depth < p.depth && q.x0 < p.x0 && q.x0 + q.v.w > p.x0 - 0.01 && q.v.z <= p.v.z,
        );
        return (
          <g key={i}>
            {behind ? (
              <rect x={x - 0.55 * S} y={yTop + 0.3 * S} width={0.55 * S} height={h - 0.3 * S} fill={scenery.shadow} />
            ) : null}
            <rect x={x} y={yTop} width={w} height={h} fill={f.face} />
            <rect x={x} y={yTop} width={w} height={h} fill={`url(#${id}-wash)`} />
            {/* remate del peto */}
            <rect x={x} y={yTop} width={w} height={0.07 * S} fill={f.top} />
            <rect x={x} y={yTop + 0.07 * S} width={w} height={0.05 * S} fill="#000" opacity={0.06} />
            {/* junta de forjado discreta */}
            <rect x={x} y={gy(p.v.z + p.v.h) - 0.02 * S} width={w} height={0.03 * S} fill="#000" opacity={0.05} />
            {p.openings.map((o, j) => (
              <OpeningShape key={j} o={o} x={gx(o.x)} y={gy(p.v.z + o.z + o.h)} id={id} />
            ))}
          </g>
        );
      })}

      {scene ? (
        <g>
          <Lavender x={gx(-1.4)} y={groundY} n={5} />
          <Lavender x={gx(W - 0.2)} y={groundY} n={4} />
          <rect y={groundY + 0.22 * S} width={vbW} height={0.06 * S} fill="#000" opacity={0.04} />
        </g>
      ) : null}
    </svg>
  );
}

function OpeningShape({ o, x, y, id }: { o: Opening; x: number; y: number; id: string }) {
  const w = o.w * S;
  const h = o.h * S;
  const fr = 0.06 * S;
  const reveal = 0.12 * S;
  if (o.type === "door") {
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} fill={scenery.frame} />
        <rect x={x + fr} y={y + fr} width={w - fr * 2} height={h - fr} fill={scenery.door} />
        <rect x={x + fr} y={y + fr} width={w - fr * 2} height={reveal * 0.8} fill="#000" opacity={0.25} />
        <rect x={x + w - fr - 0.18 * S} y={y + h * 0.5} width={0.04 * S} height={0.42 * S} fill="#D8CDB9" />
      </g>
    );
  }
  const mullions = o.type === "glazing" ? Math.max(1, Math.round(o.w / 1.5)) : o.w > 1.2 ? 2 : 1;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={scenery.frame} />
      <rect x={x + fr} y={y + fr} width={w - fr * 2} height={h - fr * 2} fill={`url(#${id}-glass)`} />
      {/* reflejo diagonal */}
      <path
        d={`M${x + w * 0.12} ${y + h - fr} L${x + w * 0.42} ${y + fr} L${x + w * 0.5} ${y + fr} L${x + w * 0.2} ${y + h - fr} Z`}
        fill="#fff"
        opacity={0.07}
      />
      {Array.from({ length: mullions - 1 }, (_, k) => (
        <rect key={k} x={x + (w / mullions) * (k + 1) - fr / 2} y={y} width={fr} height={h} fill={scenery.frame} />
      ))}
      {/* sombra del dintel en el hueco */}
      <rect x={x + fr} y={y + fr} width={w - fr * 2} height={reveal} fill="#000" opacity={0.22} />
      {o.shade
        ? Array.from({ length: Math.floor(o.w / 0.14) }, (_, k) => (
            <rect key={`s${k}`} x={x + k * 0.14 * S + 0.03 * S} y={y - 0.05 * S} width={0.06 * S} height={h + 0.1 * S} fill={scenery.slat} opacity={0.92} />
          ))
        : null}
      {o.z > 0.3 ? <rect x={x - 0.04 * S} y={y + h} width={w + 0.08 * S} height={0.05 * S} fill="#000" opacity={0.12} /> : null}
    </g>
  );
}

export function Tree({ kind, x, y, h = 4.4 }: { kind: "olive" | "cypress"; x: number; y: number; h?: number }) {
  if (kind === "cypress") {
    const H = h * S;
    const w = 0.9 * S;
    return (
      <g>
        <ellipse cx={x + 0.6 * S} cy={y + 0.05 * S} rx={1.1 * S} ry={0.12 * S} fill={scenery.shadow} />
        <path
          d={`M${x} ${y - H} C ${x + w * 0.7} ${y - H * 0.7}, ${x + w * 0.62} ${y - H * 0.15}, ${x + w * 0.2} ${y} L ${x - w * 0.2} ${y} C ${x - w * 0.62} ${y - H * 0.15}, ${x - w * 0.7} ${y - H * 0.7}, ${x} ${y - H} Z`}
          fill={scenery.cypress}
        />
        <path
          d={`M${x} ${y - H} C ${x + w * 0.7} ${y - H * 0.7}, ${x + w * 0.62} ${y - H * 0.15}, ${x + w * 0.2} ${y} L ${x + w * 0.02} ${y} C ${x + w * 0.2} ${y - H * 0.4}, ${x + w * 0.15} ${y - H * 0.8}, ${x} ${y - H} Z`}
          fill={scenery.cypressDark}
        />
      </g>
    );
  }
  const H = h * S;
  return (
    <g>
      <ellipse cx={x + 0.4 * S} cy={y + 0.06 * S} rx={2.1 * S} ry={0.16 * S} fill={scenery.shadow} />
      <path
        d={`M${x - 0.12 * S} ${y} C ${x - 0.1 * S} ${y - H * 0.25}, ${x - 0.45 * S} ${y - H * 0.42}, ${x - 0.6 * S} ${y - H * 0.55} M${x + 0.1 * S} ${y} C ${x + 0.15 * S} ${y - H * 0.3}, ${x + 0.5 * S} ${y - H * 0.45}, ${x + 0.75 * S} ${y - H * 0.58}`}
        stroke={scenery.trunk}
        strokeWidth={0.2 * S}
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx={x - 0.9 * S} cy={y - H * 0.66} rx={1.4 * S} ry={0.75 * S} fill={scenery.oliveDark} />
      <ellipse cx={x + 0.9 * S} cy={y - H * 0.7} rx={1.5 * S} ry={0.8 * S} fill={scenery.olive} />
      <ellipse cx={x} cy={y - H * 0.86} rx={1.6 * S} ry={0.85 * S} fill={scenery.olive} />
      <ellipse cx={x - 0.4 * S} cy={y - H * 0.95} rx={0.9 * S} ry={0.45 * S} fill="#A5AB8C" />
    </g>
  );
}

function Lavender({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <ellipse cx={x + i * 0.42 * S} cy={y - 0.16 * S} rx={0.26 * S} ry={0.22 * S} fill={scenery.oliveDark} />
          <ellipse cx={x + i * 0.42 * S} cy={y - 0.3 * S} rx={0.2 * S} ry={0.12 * S} fill={scenery.lavender} />
        </g>
      ))}
    </g>
  );
}
