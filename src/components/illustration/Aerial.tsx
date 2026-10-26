import type { HouseModel, Opening, Volume } from "@/content/models";
import { modelBounds } from "@/content/models";
import { finishes, scenery } from "./palette";

const S = 30;
const C = Math.cos(Math.PI / 6);

type P3 = [number, number, number];

interface Props {
  model: HouseModel;
  className?: string;
  title?: string;
}

/** Vista axonométrica elevada desde la esquina delantera derecha. */
export function Aerial({ model, className, title }: Props) {
  const { W, D, H } = modelBounds(model);
  const m = 3.2; // margen de parcela en metros
  const proj = ([x, y, z]: P3): [number, number] => [(x - y) * C, (x + y) / 2 - z];

  const corners: P3[] = [
    [-m, -m, 0],
    [W + m, -m, 0],
    [W + m, D + m, 0],
    [-m, D + m, 0],
    [0, 0, H + 0.5],
  ];
  const pts = corners.map(proj);
  const minX = Math.min(...pts.map((p) => p[0]));
  const maxX = Math.max(...pts.map((p) => p[0]));
  const minY = Math.min(...pts.map((p) => p[1]));
  const maxY = Math.max(...pts.map((p) => p[1]));
  const pad = 0.6;
  const vbW = (maxX - minX + pad * 2) * S;
  const vbH = (maxY - minY + pad * 2 + 0.6) * S;

  const toS = (p: P3) => {
    const [px, py] = proj(p);
    return `${((px - minX + pad) * S).toFixed(1)},${((py - minY + pad) * S).toFixed(1)}`;
  };
  const poly = (ps: P3[]) => ps.map(toS).join(" ");

  const sorted = [...model.volumes].sort((a, b) => a.z - b.z || a.x + a.w + a.y + a.d - (b.x + b.w + b.y + b.d));
  const k = 2.2; // longitud de sombra

  const trees: { x: number; y: number; r: number; tone: string }[] = [
    { x: -1.8, y: D * 0.35, r: 1.5, tone: scenery.olive },
    { x: W + 1.6, y: -1.2, r: 0.7, tone: scenery.cypress },
    { x: W + 2.2, y: 0.4, r: 0.6, tone: scenery.cypress },
    { x: W * 0.25, y: D + 2.0, r: 1.1, tone: scenery.oliveDark },
  ];

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} className={className} role="img" aria-label={title}>
      {title ? <title>{title}</title> : null}
      {/* parcela */}
      <polygon points={poly([[-m, -m, 0], [W + m, -m, 0], [W + m, D + m, 0], [-m, D + m, 0]])} fill={scenery.lawn} />
      <polygon
        points={poly([[-m, -m, 0], [W + m, -m, 0], [W + m, D + m, 0], [-m, D + m, 0]])}
        fill="none"
        stroke="#B3AF8E"
        strokeWidth={1}
      />
      {/* pavimento perimetral */}
      <polygon points={poly([[-0.9, -0.6, 0], [W + 0.6, -0.6, 0], [W + 0.6, D + 1.4, 0], [-0.9, D + 1.4, 0]])} fill={scenery.gravel} />

      {/* sombras arrojadas */}
      {model.volumes.map((v, i) => {
        const x0 = v.x, x1 = v.x + v.w, y0 = v.y, y1 = v.y + v.d;
        const kk = k * ((v.z + v.h) / 3);
        return (
          <polygon
            key={`sh${i}`}
            points={poly([[x0, y1, 0], [x0, y0, 0], [x0 + kk, y0 - kk, 0], [x1 + kk, y0 - kk, 0], [x1 + kk, y1 - kk, 0], [x1, y1, 0]])}
            fill={scenery.shadow}
          />
        );
      })}

      {trees.map((t, i) => (
        <g key={`t${i}`}>
          <ellipse
            cx={(proj([t.x + 0.8, t.y - 0.8, 0])[0] - minX + pad) * S}
            cy={(proj([t.x + 0.8, t.y - 0.8, 0])[1] - minY + pad) * S}
            rx={t.r * S * 1.1}
            ry={t.r * S * 0.55}
            fill={scenery.shadow}
          />
          <circle
            cx={(proj([t.x, t.y, 0])[0] - minX + pad) * S}
            cy={(proj([t.x, t.y, 1.6])[1] - minY + pad) * S}
            r={t.r * S}
            fill={t.tone}
          />
        </g>
      ))}

      {sorted.map((v, i) => (
        <Box key={i} v={v} poly={poly} />
      ))}
    </svg>
  );
}

function Box({ v, poly }: { v: Volume; poly: (ps: P3[]) => string }) {
  const f = finishes[v.finish];
  const x0 = v.x, x1 = v.x + v.w, y0 = v.y, y1 = v.y + v.d;
  const zb = v.z, zt = v.z + v.h + v.parapet;
  const zr = v.z + v.h;
  const t = 0.22;
  const frontOp = (o: Opening): P3[] => [
    [o.x, y1, zb + o.z],
    [o.x + o.w, y1, zb + o.z],
    [o.x + o.w, y1, zb + o.z + o.h],
    [o.x, y1, zb + o.z + o.h],
  ];
  const rightOp = (o: Opening): P3[] => [
    [x1, o.x, zb + o.z],
    [x1, o.x + o.w, zb + o.z],
    [x1, o.x + o.w, zb + o.z + o.h],
    [x1, o.x, zb + o.z + o.h],
  ];
  return (
    <g>
      {/* cubierta plana con peto: anillo superior, plano de cubierta y caras interiores */}
      <polygon points={poly([[x0, y0, zt], [x1, y0, zt], [x1, y1, zt], [x0, y1, zt]])} fill={f.top} />
      <polygon points={poly([[x0 + t, y0 + t, zr], [x1 - t, y0 + t, zr], [x1 - t, y1 - t, zr], [x0 + t, y1 - t, zr]])} fill="#CFC8BA" />
      <polygon points={poly([[x0 + t, y0 + t, zt], [x0 + t, y0 + t, zr], [x0 + t, y1 - t, zr], [x0 + t, y1 - t, zt]])} fill="#BDB5A6" />
      <polygon points={poly([[x0 + t, y0 + t, zt], [x1 - t, y0 + t, zt], [x1 - t, y0 + t, zr], [x0 + t, y0 + t, zr]])} fill="#C6BFB1" />
      {/* fachada principal */}
      <polygon points={poly([[x0, y1, zb], [x1, y1, zb], [x1, y1, zt], [x0, y1, zt]])} fill={f.face} />
      {/* fachada lateral derecha */}
      <polygon points={poly([[x1, y1, zb], [x1, y0, zb], [x1, y0, zt], [x1, y1, zt]])} fill={f.side} />
      {/* coronación de petos delantero y derecho */}
      <polygon points={poly([[x0, y1 - t, zt], [x1, y1 - t, zt], [x1, y1, zt], [x0, y1, zt]])} fill={f.top} />
      <polygon points={poly([[x1 - t, y0, zt], [x1, y0, zt], [x1, y1, zt], [x1 - t, y1, zt]])} fill={f.top} />
      {v.openings.front.map((o, i) => (
        <polygon key={`f${i}`} points={poly(frontOp(o))} fill={o.type === "door" ? scenery.door : scenery.glassTop} stroke={scenery.frame} strokeWidth={1.2} />
      ))}
      {v.openings.right.map((o, i) => (
        <polygon key={`r${i}`} points={poly(rightOp(o))} fill={o.type === "door" ? scenery.door : scenery.glassBottom} stroke={scenery.frame} strokeWidth={1.2} />
      ))}
      {/* aristas */}
      <polyline points={poly([[x0, y1, zb], [x0, y1, zt], [x1, y1, zt], [x1, y0, zt]])} fill="none" stroke="#fff" strokeOpacity={0.6} strokeWidth={1} />
      <polyline points={poly([[x1, y1, zb], [x1, y1, zt]])} fill="none" stroke="#000" strokeOpacity={0.08} strokeWidth={1} />
    </g>
  );
}
