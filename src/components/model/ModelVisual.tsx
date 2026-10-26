import Image from "next/image";
import type { HouseModel, RoomKind } from "@/content/models";
import { Elevation } from "@/components/illustration/Elevation";
import { Aerial } from "@/components/illustration/Aerial";
import { FloorPlan } from "@/components/illustration/FloorPlan";

export type View = "front" | "rear" | "aerial" | "plan";

interface Props {
  model: HouseModel;
  view: View;
  alt: string;
  roomLabels?: Record<RoomKind, string>;
  floorLabels?: [string, string];
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Para la planta: solo un nivel concreto. */
  level?: 0 | 1;
  /** Proporción del contenedor para las fachadas (ancho/alto). */
  aspect?: number;
}

/**
 * Muestra el render real si existe en models.ts (renders.front, …);
 * si no, la ilustración generada a partir de la geometría del modelo.
 */
export function ModelVisual({ model, view, alt, roomLabels, floorLabels, className = "", sizes = "100vw", priority, level, aspect = 4 / 3 }: Props) {
  const src = model.renders[view];
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  if (view === "front" || view === "rear") {
    return (
      <Elevation
        model={model}
        view={view}
        title={alt}
        sideMargin={2.6}
        aspect={aspect}
        className={`h-full w-full ${className}`}
        preserveAspectRatio="xMidYMax slice"
      />
    );
  }
  if (view === "aerial") {
    return (
      <div className={`flex items-center justify-center bg-[#E9E7DB] ${className}`}>
        <Aerial model={model} title={alt} className="h-[92%] w-[92%]" />
      </div>
    );
  }
  const floors = level === undefined ? model.floors : model.floors.filter((f) => f.level === level);
  return (
    <div className={`grid gap-4 bg-paper p-4 ${floors.length > 1 ? "sm:grid-cols-2" : ""} ${className}`}>
      {floors.map((f) => (
        <figure key={f.level} className="flex min-h-0 flex-col">
          {model.floors.length > 1 && floorLabels ? (
            <figcaption className="mb-2 text-[0.8rem] text-grafito">{floorLabels[f.level]}</figcaption>
          ) : null}
          <FloorPlan
            model={model}
            floor={f}
            labels={roomLabels!}
            title={`${alt}${model.floors.length > 1 && floorLabels ? `, ${floorLabels[f.level]}` : ""}`}
            className="h-full max-h-full w-full"
          />
        </figure>
      ))}
    </div>
  );
}
