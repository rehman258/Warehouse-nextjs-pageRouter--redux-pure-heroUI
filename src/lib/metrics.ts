import type { InventoryItem, Order } from "./types";

/** Dashboard aggregates derived from inventory + orders. */
export interface DashboardMetrics {
  totalSkus: number;
  totalUnits: number;
  inventoryValue: number;
  lowStock: number;
  outOfStock: number;
  pendingOrders: number;
}

export function computeMetrics(inventory: InventoryItem[], orders: Order[]): DashboardMetrics {
  return {
    totalSkus: inventory.length,
    totalUnits: inventory.reduce((sum, it) => sum + it.stock, 0),
    inventoryValue: inventory.reduce((sum, it) => sum + it.stock * it.price, 0),
    lowStock: inventory.filter((it) => it.status === "lowStock").length,
    outOfStock: inventory.filter((it) => it.status === "outOfStock").length,
    pendingOrders: orders.filter((o) => o.status === "pending" || o.status === "approved").length,
  };
}
