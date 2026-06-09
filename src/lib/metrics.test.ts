import { describe, expect, it } from "vitest";
import { computeMetrics } from "./metrics";
import { INVENTORY, ORDERS } from "./seed";

describe("computeMetrics", () => {
  const m = computeMetrics(INVENTORY, ORDERS);

  it("counts SKUs and units", () => {
    expect(m.totalSkus).toBe(INVENTORY.length);
    expect(m.totalUnits).toBe(INVENTORY.reduce((s, it) => s + it.stock, 0));
  });

  it("sums inventory value as stock * price", () => {
    const expected = INVENTORY.reduce((s, it) => s + it.stock * it.price, 0);
    expect(m.inventoryValue).toBeCloseTo(expected, 2);
  });

  it("counts low / out of stock from item status", () => {
    expect(m.lowStock).toBe(INVENTORY.filter((i) => i.status === "lowStock").length);
    expect(m.outOfStock).toBe(INVENTORY.filter((i) => i.status === "outOfStock").length);
  });

  it("counts pending + approved orders as pending", () => {
    const expected = ORDERS.filter((o) => o.status === "pending" || o.status === "approved").length;
    expect(m.pendingOrders).toBe(expected);
  });
});
