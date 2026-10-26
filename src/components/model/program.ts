import type { HouseModel } from "@/content/models";
import type { Dictionary } from "@/content/i18n/es";
import { t } from "@/lib/i18n";

export function programText(model: HouseModel, dict: Dictionary) {
  const b = t(model.bedrooms === 1 ? dict.common.bedroom : dict.common.bedrooms, { n: model.bedrooms });
  const w = t(model.bathrooms === 1 ? dict.common.bathroom : dict.common.bathrooms, { n: model.bathrooms });
  return `${b}, ${w}`;
}
