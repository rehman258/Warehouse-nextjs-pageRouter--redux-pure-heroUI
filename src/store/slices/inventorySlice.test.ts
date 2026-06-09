import { describe, expect, it } from "vitest";
import reducer, { addItem, deleteItem, updateItem } from "./inventorySlice";

const initial = reducer(undefined, { type: "@@INIT" });

const sampleValues = {
  sku: "SKU-TEST",
  productName: "Test Widget",
  category: "Tools",
  stock: 3,
  location: "Z9-Z9",
  price: 19.99,
};

describe("inventorySlice", () => {
  it("adds an item with a generated id and derived status", () => {
    const next = reducer(initial, addItem(sampleValues));
    expect(next.items.length).toBe(initial.items.length + 1);
    const added = next.items[0];
    expect(added.id).toBe(initial.items.reduce((m, it) => Math.max(m, it.id), 0) + 1);
    expect(added.status).toBe("lowStock"); // stock 3 -> lowStock
    expect(added.productName).toBe("Test Widget");
  });

  it("derives outOfStock / inStock from the stock value", () => {
    const zero = reducer(initial, addItem({ ...sampleValues, stock: 0 }));
    expect(zero.items[0].status).toBe("outOfStock");
    const many = reducer(initial, addItem({ ...sampleValues, stock: 50 }));
    expect(many.items[0].status).toBe("inStock");
  });

  it("updates an item and recomputes its status", () => {
    const target = initial.items[0];
    const next = reducer(initial, updateItem({ id: target.id, values: { ...sampleValues, stock: 0 } }));
    const updated = next.items.find((it) => it.id === target.id)!;
    expect(updated.productName).toBe("Test Widget");
    expect(updated.status).toBe("outOfStock");
  });

  it("deletes an item by id", () => {
    const target = initial.items[0];
    const next = reducer(initial, deleteItem(target.id));
    expect(next.items.find((it) => it.id === target.id)).toBeUndefined();
    expect(next.items.length).toBe(initial.items.length - 1);
  });
});
