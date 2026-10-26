/**
 * Esquema axonométrico explotado de una esquina construida con piezas de hormigón celular.
 * Es un esquema genérico del sistema constructivo, no la definición técnica del kit.
 */

const S = 46;
const C = Math.cos(Math.PI / 6);
type P = [number, number, number];

const proj = ([x, y, z]: P): [number, number] => [(x - y) * C * S, ((x + y) / 2 - z) * S];

export function SystemDiagram({ title, className }: { title: string; className?: string }) {
  const ox = 236;
  const oy = 318;
  const pt = (p: P) => {
    const [x, y] = proj(p);
    return `${(x + ox).toFixed(1)},${(y + oy).toFixed(1)}`;
  };
  const poly = (ps: P[]) => ps.map(pt).join(" ");
  const xy = (p: P) => {
    const [x, y] = proj(p);
    return [x + ox, y + oy] as const;
  };

  const L = 4.4; // largo muro principal (x)
  const Dp = 3.0; // largo muro lateral (y)
  const T = 0.3; // espesor
  const zSlab = 1.25;
  const zWall = 2.35;
  const Hw = 1.75; // 7 hiladas
  const zRoof = zWall + Hw + 2.4;
  const op = { x0: 2.0, x1: 3.05, z0: 0.5, z1: 1.25 };

  const block = "#F1EDE5";
  const blockSide = "#DCD5C7";
  const blockTop = "#FAF8F3";
  const line = "rgba(42,43,40,0.28)";

  // juntas de las hiladas en la cara frontal del muro principal (plano y = T)
  const frontJoints: string[] = [];
  for (let c = 0; c < 7; c++) {
    const z0 = zWall + c * 0.25;
    const off = c % 2 ? 0.3125 : 0;
    for (let x = off + T; x < L; x += 0.625) {
      const inOpening = x > op.x0 && x < op.x1 && c * 0.25 >= op.z0 - 0.01 && (c + 1) * 0.25 <= op.z1 + 0.01;
      if (!inOpening && x > T + 0.05) frontJoints.push(`M${pt([x, T, z0])} L${pt([x, T, z0 + 0.25])}`);
    }
  }
  const sideJoints: string[] = [];
  for (let c = 0; c < 7; c++) {
    const z0 = zWall + c * 0.25;
    const off = c % 2 ? 0 : 0.3125;
    for (let y = off + T; y < Dp; y += 0.625) sideJoints.push(`M${pt([T, y, z0])} L${pt([T, y, z0 + 0.25])}`);
  }
  const courses: string[] = [];
  for (let c = 1; c < 7; c++) {
    const z = zWall + c * 0.25;
    courses.push(`M${pt([T, T, z])} L${pt([L, T, z])}`);
    courses.push(`M${pt([T, T, z])} L${pt([T, Dp, z])}`);
  }

  const badge = (n: number, p: P, dx = 0) => {
    const [x0, y] = xy(p);
    const x = x0 + dx;
    return (
      <g key={n}>
        {dx ? <line x1={x0} y1={y} x2={x} y2={y} stroke="#2A2B28" strokeWidth={0.8} /> : null}
        <circle cx={x} cy={y} r={13} fill="#2A2B28" stroke="#F7F5F0" strokeWidth={2} />
        <text x={x} y={y + 4.5} textAnchor="middle" fontSize={13} fill="#F7F5F0" fontFamily="var(--font-sans), sans-serif">
          {n}
        </text>
      </g>
    );
  };

  // retícula de modulación
  const grid: string[] = [];
  for (let x = 0; x <= L + 0.01; x += 0.625) grid.push(`M${pt([x, 0, 0])} L${pt([x, Dp, 0])}`);
  for (let y = 0; y <= Dp + 0.01; y += 0.625) grid.push(`M${pt([0, y, 0])} L${pt([L, y, 0])}`);

  return (
    <svg viewBox="0 0 520 510" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      {/* guías verticales del despiece */}
      {([[0, 0], [L, T], [T, Dp]] as [number, number][]).map(([x, y], i) => (
        <line key={i} x1={xy([x, y, 0])[0]} y1={xy([x, y, 0])[1]} x2={xy([x, y, zRoof])[0]} y2={xy([x, y, zRoof])[1]} stroke="#2A2B28" strokeOpacity={0.18} strokeDasharray="3 4" />
      ))}

      {/* 1 · plano y modulación */}
      <polygon points={poly([[0, 0, 0], [L, 0, 0], [L, Dp, 0], [0, Dp, 0]])} fill="#EEF0F0" stroke="#7E8B8E" strokeWidth={0.8} />
      <path d={grid.join(" ")} stroke="#7E8B8E" strokeOpacity={0.5} strokeWidth={0.6} fill="none" />
      <polygon points={poly([[0, 0, 0], [L, 0, 0], [L, T, 0], [T, T, 0], [T, Dp, 0], [0, Dp, 0]])} fill="#7E8B8E" fillOpacity={0.35} />

      {/* 2 · base según proyecto (trazo discontinuo: pendiente de confirmar) */}
      <polygon points={poly([[-0.2, -0.2, zSlab], [L + 0.2, -0.2, zSlab], [L + 0.2, Dp + 0.2, zSlab], [-0.2, Dp + 0.2, zSlab]])} fill="#E3DED4" stroke="#2A2B28" strokeWidth={0.9} strokeDasharray="5 4" />
      <polygon points={poly([[-0.2, Dp + 0.2, zSlab], [L + 0.2, Dp + 0.2, zSlab], [L + 0.2, Dp + 0.2, zSlab - 0.22], [-0.2, Dp + 0.2, zSlab - 0.22]])} fill="#D2CBBE" stroke="#2A2B28" strokeWidth={0.9} strokeDasharray="5 4" />
      <polygon points={poly([[L + 0.2, -0.2, zSlab], [L + 0.2, Dp + 0.2, zSlab], [L + 0.2, Dp + 0.2, zSlab - 0.22], [L + 0.2, -0.2, zSlab - 0.22]])} fill="#C6BFB2" stroke="#2A2B28" strokeWidth={0.9} strokeDasharray="5 4" />

      {/* 3 · muros de piezas de hormigón celular */}
      {/* muro lateral (eje y) */}
      <polygon points={poly([[0, T, zWall + Hw], [T, T, zWall + Hw], [T, Dp, zWall + Hw], [0, Dp, zWall + Hw]])} fill={blockTop} />
      <polygon points={poly([[T, T, zWall], [T, Dp, zWall], [T, Dp, zWall + Hw], [T, T, zWall + Hw]])} fill={blockSide} />
      <polygon points={poly([[0, Dp, zWall], [T, Dp, zWall], [T, Dp, zWall + Hw], [0, Dp, zWall + Hw]])} fill={block} />
      {/* muro principal (eje x) */}
      <polygon points={poly([[0, 0, zWall + Hw], [L, 0, zWall + Hw], [L, T, zWall + Hw], [0, T, zWall + Hw]])} fill={blockTop} />
      <polygon points={poly([[T, T, zWall], [L, T, zWall], [L, T, zWall + Hw], [T, T, zWall + Hw]])} fill={block} />
      <polygon points={poly([[L, 0, zWall], [L, T, zWall], [L, T, zWall + Hw], [L, 0, zWall + Hw]])} fill={blockSide} />
      <path d={[...courses, ...frontJoints, ...sideJoints].join(" ")} stroke={line} strokeWidth={0.8} fill="none" />

      {/* 4 · hueco y refuerzo (dintel) */}
      <polygon points={poly([[op.x0, T, zWall + op.z0], [op.x1, T, zWall + op.z0], [op.x1, T, zWall + op.z1], [op.x0, T, zWall + op.z1]])} fill="#3A3E3B" />
      <polygon points={poly([[op.x0, T, zWall + op.z0], [op.x0 + 0.12, 0.18, zWall + op.z0], [op.x0 + 0.12, 0.18, zWall + op.z1], [op.x0, T, zWall + op.z1]])} fill="#555A55" />
      <polygon points={poly([[op.x0 - 0.3, T, zWall + op.z1], [op.x1 + 0.3, T, zWall + op.z1], [op.x1 + 0.3, T, zWall + op.z1 + 0.25], [op.x0 - 0.3, T, zWall + op.z1 + 0.25]])} fill="#CDBB9C" stroke="#2A2B28" strokeWidth={0.6} />

      {/* 5 · forjado / cubierta según ficha técnica (discontinuo) */}
      <polygon points={poly([[-0.1, -0.1, zRoof], [L + 0.1, -0.1, zRoof], [L + 0.1, Dp + 0.1, zRoof], [-0.1, Dp + 0.1, zRoof]])} fill="#F4F1EA" fillOpacity={0.9} stroke="#2A2B28" strokeWidth={0.9} strokeDasharray="5 4" />
      <polygon points={poly([[-0.1, Dp + 0.1, zRoof], [L + 0.1, Dp + 0.1, zRoof], [L + 0.1, Dp + 0.1, zRoof - 0.25], [-0.1, Dp + 0.1, zRoof - 0.25]])} fill="#E2DCCF" stroke="#2A2B28" strokeWidth={0.9} strokeDasharray="5 4" />
      <polygon points={poly([[L + 0.1, -0.1, zRoof], [L + 0.1, Dp + 0.1, zRoof], [L + 0.1, Dp + 0.1, zRoof - 0.25], [L + 0.1, -0.1, zRoof - 0.25]])} fill="#D6CFC1" stroke="#2A2B28" strokeWidth={0.9} strokeDasharray="5 4" />

      {badge(1, [L, Dp * 0.55, 0], 22)}
      {badge(2, [L + 0.2, Dp * 0.55, zSlab - 0.11], 22)}
      {badge(3, [L * 0.25, T, zWall + Hw * 0.45])}
      {badge(4, [op.x1 + 0.3, T, zWall + op.z1 + 0.12], 34)}
      {badge(5, [L + 0.1, Dp * 0.55, zRoof - 0.12], 22)}
    </svg>
  );
}
