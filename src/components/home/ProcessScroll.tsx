"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { getModel, modelBounds } from "@/content/models";

interface Step {
  title: string;
  text: string;
}

interface Props {
  steps: Step[];
  stageLabels: string[];
  stageNote: string;
  noDates: string;
  illustrationTitle: string;
}

const S = 40;

/**
 * Recorrido comercial en seis pasos con una ilustración que evoluciona
 * del plano a la estructura montada mientras se hace scroll.
 * Solo anima transformaciones, opacidad y un recorte, para no penalizar el móvil.
 */
export function ProcessScroll({ steps, stageLabels, stageNote, noDates, illustrationTitle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length * 0.999)));
    setActive((prev) => (prev === i ? prev : i));
  });

  if (reduce) {
    return (
      <div className="grid gap-10 lg:grid-cols-12">
        <ol className="space-y-6 lg:col-span-5">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-2">
              <span className="figure text-grafito">{i + 1}</span>
              <div>
                <h3 className="heading text-[1.35rem]">{s.title}</h3>
                <p className="prose-serif mt-1 text-grafito">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="lg:col-span-7">
          <BuildIllustration progress={null} title={illustrationTitle} />
          <p className="mt-3 text-[0.8rem] text-grafito">{stageNote}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative" style={{ height: `${steps.length * 75}svh` }}>
      <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col justify-center overflow-hidden pb-24 pt-4 md:pb-6">
        <div className="grid h-full grid-rows-[auto_1fr] gap-4 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-12">
          {/* Pasos */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {steps.map((_, i) => (
                <span key={i} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-antracita" : "bg-piedra-deep"}`} />
              ))}
            </div>
            <ol className="mt-5 hidden space-y-1 lg:block">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  aria-current={i === active ? "step" : undefined}
                  className={`grid grid-cols-[2.25rem_1fr] gap-1 rounded-xl py-3 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-35"}`}
                >
                  <span className="figure pt-1 text-grafito">{i + 1}</span>
                  <div>
                    <h3 className="heading text-[1.3rem]">{s.title}</h3>
                    <div className={`grid transition-[grid-template-rows] duration-500 ${i === active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <p className="prose-serif overflow-hidden pt-1 text-grafito">{s.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 min-h-[8.5rem] lg:hidden" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="figure text-grafito">
                    {active + 1} / {steps.length}
                  </p>
                  <h3 className="heading mt-1 text-[1.5rem]">{steps[active].title}</h3>
                  <p className="prose-serif mt-1 text-[1rem] text-grafito">{steps[active].text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Lista completa para lectores de pantalla */}
            <ol className="sr-only">
              {steps.map((s) => (
                <li key={s.title}>
                  {s.title}. {s.text}
                </li>
              ))}
            </ol>
          </div>

          {/* Ilustración */}
          <div className="flex min-h-0 flex-col justify-center lg:col-span-7">
            <div className="relative min-h-0 lg:flex-none">
              <BuildIllustration progress={scrollYProgress} title={illustrationTitle} />
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-4 text-[0.78rem] text-grafito">
              <span className="text-antracita">{stageLabels[active]}</span>
              <span className="text-right">{stageNote}</span>
            </div>
          </div>
        </div>
        <p className="mt-4 hidden text-[0.8rem] text-grafito lg:block">{noDates}</p>
      </div>
    </div>
  );
}

function BuildIllustration({ progress, title }: { progress: MotionValue<number> | null; title: string }) {
  const model = getModel("mestral")!;
  const { W, H } = modelBounds(model);
  const mx = 1.6;
  const top = 1.2;
  const bottom = 1.2;
  const vbW = (W + mx * 2) * S;
  const vbH = (H + top + bottom) * S;
  const gx = (x: number) => (x + mx) * S;
  const gy = (z: number) => (top + H - z) * S;
  const ground = gy(0);
  const [gf, up] = model.volumes;

  const fixed = (v: number) => () => v;
  const p = progress;
  const at = (input: number[], output: number[]) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    p ? useTransform(p, input, output, { clamp: true }) : fixed(output[output.length - 1])();

  const blueprintDraw = at([0, 0.14], [0, 1]);
  const blueprintOpacity = at([0, 0.05, 0.75, 1], [0, 1, 0.55, 0.22]);
  const baseScale = at([0.16, 0.3], [0, 1]);
  const gfH = gf.h + gf.parapet * 0;
  const gfRise = at([0.33, 0.5, 0.62], [0, gfH * 0.45, gfH]);
  const upRise = at([0.55, 0.7], [0, up.h + up.parapet]);
  const lintelOpacity = at([0.68, 0.78], [0, 1]);
  const slabOpacity = at([0.84, 0.95], [0, 1]);
  const gfParapet = at([0.84, 0.95], [0, gf.parapet]);

  const gfClipY = useClipY(gfRise, ground);
  const gfClipH = useClipH(gfRise);
  const upClipY = useClipY(upRise, gy(up.z));
  const upClipH = useClipH(upRise);
  const gfParY = useClipY(gfParapet, gy(gf.h));
  const gfParH = useClipH(gfParapet);

  const outline = [
    `M${gx(gf.x)} ${ground} V${gy(gf.h + gf.parapet)} H${gx(gf.x + gf.w)} V${ground}`,
    `M${gx(up.x)} ${gy(up.z)} V${gy(up.z + up.h + up.parapet)} H${gx(up.x + up.w)} V${gy(up.z)}`,
    ...[...gf.openings.front.map((o) => ({ o, z: 0 })), ...up.openings.front.map((o) => ({ o, z: up.z }))].map(
      ({ o, z }) => `M${gx(o.x)} ${gy(z + o.z)} V${gy(z + o.z + o.h)} H${gx(o.x + o.w)} V${gy(z + o.z)} Z`,
    ),
  ];

  const grid: string[] = [];
  for (let x = -1; x <= W + 1; x += 0.625 * 2) grid.push(`M${gx(x)} ${gy(H + 0.8)} V${ground + S}`);
  for (let z = -0.5; z <= H + 0.8; z += 0.5) grid.push(`M${gx(-1.2)} ${gy(z)} H${gx(W + 1.2)}`);

  const openingsGF = gf.openings.front;
  const openingsUp = up.openings.front;

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} className="h-full max-h-[62svh] w-full lg:max-h-none" role="img" aria-label={title}>
      <defs>
        <pattern id="aac" width={0.625 * S} height={0.5 * S} patternUnits="userSpaceOnUse" x={gx(0)} y={ground}>
          <rect width={0.625 * S} height={0.5 * S} fill="#F1EDE5" />
          <path
            d={`M0 0.5 H${0.625 * S} M0 ${0.25 * S} H${0.625 * S} M0.5 0 V${0.25 * S} M${0.3125 * S} ${0.25 * S} V${0.5 * S}`}
            stroke="#2A2B28"
            strokeOpacity={0.16}
            strokeWidth={1}
          />
        </pattern>
        <clipPath id="clip-gf">
          <motion.rect x={gx(gf.x) - 2} width={gf.w * S + 4} y={gfClipY} height={gfClipH} />
        </clipPath>
        <clipPath id="clip-up">
          <motion.rect x={gx(up.x) - 2} width={up.w * S + 4} y={upClipY} height={upClipH} />
        </clipPath>
        <clipPath id="clip-gfpar">
          <motion.rect x={gx(gf.x) - 2} width={gf.w * S + 4} y={gfParY} height={gfParH} />
        </clipPath>
      </defs>

      <rect width={vbW} height={vbH} fill="#F3F1EB" />

      {/* plano: retícula y trazado */}
      <motion.g style={{ opacity: blueprintOpacity }}>
        <path d={grid.join(" ")} stroke="#7E8B8E" strokeOpacity={0.35} strokeWidth={0.7} fill="none" />
        <motion.path
          d={outline.join(" ")}
          stroke="#4C5B5F"
          strokeWidth={1.4}
          fill="none"
          strokeDasharray="1 0"
          style={{ pathLength: blueprintDraw }}
        />
      </motion.g>

      {/* replanteo / base según proyecto */}
      <motion.g style={{ scaleX: baseScale, originX: 0.5, originY: 1 }}>
        <rect x={gx(-0.4)} y={ground} width={(W + 0.8) * S} height={0.3 * S} fill="#E0DACF" stroke="#2A2B28" strokeDasharray="5 4" strokeWidth={0.9} />
      </motion.g>
      <rect x={0} y={ground + 0.3 * S} width={vbW} height={1} fill="#2A2B28" opacity={0.25} />

      {/* planta baja */}
      <g clipPath="url(#clip-gf)">
        <rect x={gx(gf.x)} y={gy(gf.h)} width={gf.w * S} height={gf.h * S} fill="url(#aac)" />
        <rect x={gx(gf.x)} y={gy(gf.h)} width={gf.w * S} height={gf.h * S} fill="none" stroke="#2A2B28" strokeOpacity={0.35} />
        {openingsGF.map((o, i) => (
          <rect key={i} x={gx(o.x)} y={gy(o.z + o.h)} width={o.w * S} height={o.h * S} fill="#454A46" />
        ))}
      </g>
      <g clipPath="url(#clip-gfpar)">
        <rect x={gx(gf.x)} y={gy(gf.h + gf.parapet)} width={gf.w * S} height={gf.parapet * S} fill="url(#aac)" />
      </g>

      {/* planta alta */}
      <g clipPath="url(#clip-up)">
        <rect x={gx(up.x)} y={gy(up.z + up.h + up.parapet)} width={up.w * S} height={(up.h + up.parapet) * S} fill="url(#aac)" />
        <rect x={gx(up.x)} y={gy(up.z + up.h + up.parapet)} width={up.w * S} height={(up.h + up.parapet) * S} fill="none" stroke="#2A2B28" strokeOpacity={0.35} />
        {openingsUp.map((o, i) => (
          <rect key={i} x={gx(o.x)} y={gy(up.z + o.z + o.h)} width={o.w * S} height={o.h * S} fill="#3A3E3B" />
        ))}
      </g>

      {/* dinteles y refuerzos */}
      <motion.g style={{ opacity: lintelOpacity }}>
        {[...openingsGF.map((o) => ({ o, z: 0 })), ...openingsUp.map((o) => ({ o, z: up.z }))].map(({ o, z }, i) => (
          <rect key={i} x={gx(o.x - 0.2)} y={gy(z + o.z + o.h + 0.25)} width={(o.w + 0.4) * S} height={0.25 * S} fill="#CDBB9C" stroke="#2A2B28" strokeOpacity={0.4} strokeWidth={0.8} />
        ))}
      </motion.g>

      {/* forjado y cubierta según proyecto: trazo discontinuo */}
      <motion.g style={{ opacity: slabOpacity }}>
        <rect x={gx(gf.x)} y={gy(gf.h) - 0.1 * S} width={gf.w * S} height={0.22 * S} fill="#E6E0D4" stroke="#2A2B28" strokeDasharray="5 4" strokeWidth={0.9} />
        <rect x={gx(up.x)} y={gy(up.z + up.h) - 0.1 * S} width={up.w * S} height={0.22 * S} fill="#E6E0D4" stroke="#2A2B28" strokeDasharray="5 4" strokeWidth={0.9} />
      </motion.g>
    </svg>
  );
}

function useClipY(rise: MotionValue<number> | number, base: number) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return typeof rise === "number" ? base - rise * S : useTransform(rise, (r) => base - r * S);
}
function useClipH(rise: MotionValue<number> | number) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return typeof rise === "number" ? rise * S : useTransform(rise, (r) => r * S);
}
