function group(int: string) {
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** 84000 → "84.000 €" (agrupación siempre, también en cifras de 4 dígitos). */
export function euro(value: number, decimals = 0) {
  const fixed = Math.abs(value).toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const sign = value < 0 ? "−" : "";
  return `${sign}${group(int)}${dec ? "," + dec : ""} €`;
}

export function num(value: number, decimals = 0) {
  const fixed = value.toFixed(decimals);
  const [int, dec] = fixed.split(".");
  return `${group(int)}${dec && Number(dec) !== 0 ? "," + dec : ""}`;
}
