import { describe, expect, it } from "vitest";
import { formatCurrency, formatNumber, orderStatusLabel, stockStatusLabel, titleCase } from "./format";

describe("formatCurrency", () => {
  it("groups thousands and keeps two decimals", () => {
    expect(formatCurrency(12500)).toBe("$12,500.00");
    expect(formatCurrency(99.99)).toBe("$99.99");
    expect(formatCurrency(0)).toBe("$0.00");
    expect(formatCurrency(-249.99)).toBe("-$249.99");
  });
});

describe("formatNumber", () => {
  it("groups whole numbers", () => {
    expect(formatNumber(1500)).toBe("1,500");
    expect(formatNumber(42)).toBe("42");
  });
});

describe("labels", () => {
  it("maps stock statuses", () => {
    expect(stockStatusLabel("inStock")).toBe("In Stock");
    expect(stockStatusLabel("outOfStock")).toBe("Out of Stock");
  });
  it("maps order statuses", () => {
    expect(orderStatusLabel("inTransit")).toBe("In Transit");
    expect(orderStatusLabel("delivered")).toBe("Delivered");
  });
  it("title-cases priorities", () => {
    expect(titleCase("high")).toBe("High");
  });
});
