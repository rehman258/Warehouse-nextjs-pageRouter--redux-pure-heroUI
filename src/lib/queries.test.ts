import { describe, expect, it } from "vitest";
import { queryInventory, queryOrders } from "./queries";
import { INVENTORY, ORDERS } from "./seed";

describe("queryInventory", () => {
  it("paginates", () => {
    const r = queryInventory(INVENTORY, { pageSize: 5, page: 1 });
    expect(r.items).toHaveLength(5);
    expect(r.total).toBe(INVENTORY.length);
    expect(r.totalPages).toBe(Math.ceil(INVENTORY.length / 5));
  });

  it("clamps out-of-range pages", () => {
    const r = queryInventory(INVENTORY, { pageSize: 5, page: 999 });
    expect(r.page).toBe(r.totalPages);
  });

  it("searches by name, sku, location and category", () => {
    const r = queryInventory(INVENTORY, { search: "shoes", pageSize: 100 });
    expect(r.items.length).toBeGreaterThan(0);
    expect(r.items.every((i) => i.productName.toLowerCase().includes("shoes"))).toBe(true);
  });

  it("filters by category", () => {
    const r = queryInventory(INVENTORY, { categories: ["Electronics"], pageSize: 100 });
    expect(r.items.length).toBeGreaterThan(0);
    expect(r.items.every((i) => i.category === "Electronics")).toBe(true);
  });

  it("filters by stock status", () => {
    const r = queryInventory(INVENTORY, { statuses: ["outOfStock"], pageSize: 100 });
    expect(r.items.every((i) => i.status === "outOfStock")).toBe(true);
  });
});

describe("queryOrders", () => {
  it("filters by status and priority", () => {
    const r = queryOrders(ORDERS, { status: "delivered", pageSize: 100 });
    expect(r.items.every((o) => o.status === "delivered")).toBe(true);

    const p = queryOrders(ORDERS, { priority: "high", pageSize: 100 });
    expect(p.items.every((o) => o.priority === "high")).toBe(true);
  });

  it("searches by order id and supplier", () => {
    const r = queryOrders(ORDERS, { search: "techcorp", pageSize: 100 });
    expect(r.items.length).toBeGreaterThan(0);
    expect(r.items.every((o) => o.supplier.toLowerCase().includes("techcorp"))).toBe(true);
  });
});
