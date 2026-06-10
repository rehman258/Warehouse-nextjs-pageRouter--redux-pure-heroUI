import { createSelector } from "@reduxjs/toolkit";
import { computeMetrics } from "@/lib/metrics";
import { inventorySelectors } from "./slices/inventorySlice";
import type { RootState } from "./index";

const selectOrders = (state: RootState) => state.orders.items;

/** Dashboard KPIs derived from inventory + orders (memoised). */
export const selectDashboardMetrics = createSelector(
  [inventorySelectors.selectAll, selectOrders],
  (inventory, orders) => computeMetrics(inventory, orders),
);

/** Items at or below their reorder threshold (low or out of stock). */
export const selectLowStockItems = createSelector([inventorySelectors.selectAll], (items) =>
  items.filter((item) => item.status !== "inStock"),
);
