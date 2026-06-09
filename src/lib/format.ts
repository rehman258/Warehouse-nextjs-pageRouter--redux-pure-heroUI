import type { OrderStatus, StockStatus } from "./types";

/** Deterministic formatting helpers (no locale/timezone drift). */

function group(int: string): string {
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** 12500 -> "$12,500.00"; 99.99 -> "$99.99". */
export function formatCurrency(value: number): string {
  const [int, dec] = Math.abs(value).toFixed(2).split(".");
  return `${value < 0 ? "-" : ""}$${group(int)}.${dec}`;
}

/** 1500 -> "1,500". */
export function formatNumber(value: number): string {
  return group(Math.round(value).toString());
}

const STOCK_LABELS: Record<StockStatus, string> = {
  inStock: "In Stock",
  lowStock: "Low Stock",
  outOfStock: "Out of Stock",
};
export const stockStatusLabel = (s: StockStatus): string => STOCK_LABELS[s];

const ORDER_LABELS: Record<OrderStatus, string> = {
  approved: "Approved",
  partial: "Partial",
  pending: "Pending",
  inTransit: "In Transit",
  delivered: "Delivered",
};
export const orderStatusLabel = (s: OrderStatus): string => ORDER_LABELS[s];

export function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
