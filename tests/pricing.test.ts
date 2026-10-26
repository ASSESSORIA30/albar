import { test } from "node:test";
import assert from "node:assert/strict";
import { estimate, clampSurface, pricePerM2 } from "../src/lib/pricing.ts";

test("ejemplo del encargo: 120 m² con montaje = 126.000 €", () => {
  const e = estimate(120, "assembly");
  assert.equal(e.kit, 84000);
  assert.equal(e.assembly, 42000);
  assert.equal(e.subtotal, 126000);
});

test("solo kit no suma montaje", () => {
  const e = estimate(120, "kit");
  assert.equal(e.assembly, 0);
  assert.equal(e.subtotal, 84000);
});

test("precios por m²", () => {
  assert.equal(pricePerM2("kit"), 700);
  assert.equal(pricePerM2("assembly"), 1050);
});

test("impuestos pendientes no se inventan", () => {
  assert.equal(estimate(90, "kit").tax, null);
});

test("superficie se acota a los límites", () => {
  assert.equal(clampSurface(10), 40);
  assert.equal(clampSurface(9999), 400);
  assert.equal(clampSurface(Number.NaN), 40);
});
