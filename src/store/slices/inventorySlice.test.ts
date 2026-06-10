import { describe, expect, it } from "vitest";
import { makeStore } from "@/store";
import { addItem, deleteItem, inventorySelectors, updateItem } from "./inventorySlice";

const sampleValues = {
  sku: "SKU-TEST",
  productName: "Test Widget",
  category: "Tools",
  stock: 3,
  location: "Z9-Z9",
  price: 19.99,
};

describe("inventory slice (entity adapter)", () => {
  it("seeds the catalogue", () => {
    const store = makeStore();
    expect(inventorySelectors.selectTotal(store.getState())).toBeGreaterThan(0);
  });

  it("adds an item with a generated id and derived status", () => {
    const store = makeStore();
    const before = inventorySelectors.selectTotal(store.getState());
    store.dispatch(addItem(sampleValues));

    const all = inventorySelectors.selectAll(store.getState());
    expect(all.length).toBe(before + 1);
    const added = all.find((i) => i.sku === "SKU-TEST")!;
    expect(added.id).toBeGreaterThan(0);
    expect(added.status).toBe("lowStock"); // stock 3 -> lowStock
  });

  it("derives out-of-stock / in-stock from the stock value", () => {
    const store = makeStore();
    store.dispatch(addItem({ ...sampleValues, sku: "SKU-ZERO", stock: 0 }));
    store.dispatch(addItem({ ...sampleValues, sku: "SKU-MANY", stock: 50 }));
    const all = inventorySelectors.selectAll(store.getState());
    expect(all.find((i) => i.sku === "SKU-ZERO")!.status).toBe("outOfStock");
    expect(all.find((i) => i.sku === "SKU-MANY")!.status).toBe("inStock");
  });

  it("updates an item and recomputes its status", () => {
    const store = makeStore();
    const target = inventorySelectors.selectAll(store.getState())[0]!;
    store.dispatch(updateItem({ id: target.id, values: { ...sampleValues, stock: 0 } }));
    const updated = inventorySelectors.selectById(store.getState(), target.id)!;
    expect(updated.productName).toBe("Test Widget");
    expect(updated.status).toBe("outOfStock");
  });

  it("deletes an item by id", () => {
    const store = makeStore();
    const target = inventorySelectors.selectAll(store.getState())[0]!;
    store.dispatch(deleteItem(target.id));
    expect(inventorySelectors.selectById(store.getState(), target.id)).toBeUndefined();
  });
});
