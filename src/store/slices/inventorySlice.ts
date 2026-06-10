import {
  createEntityAdapter, createSlice, type EntityState, type PayloadAction,
} from "@reduxjs/toolkit";
import { INVENTORY, statusFromStock } from "@/lib/seed";
import type { InventoryFormValues, InventoryItem } from "@/lib/types";

/**
 * Inventory is stored normalised via `createEntityAdapter` — O(1) lookups by id,
 * generated CRUD reducers, and ready-made memoised selectors. New items sort to
 * the top (highest id first) so a freshly-added product is immediately visible.
 */
const inventoryAdapter = createEntityAdapter<InventoryItem>({
  sortComparer: (a, b) => b.id - a.id,
});

export type InventoryState = EntityState<InventoryItem, number>;

const initialState: InventoryState = inventoryAdapter.addMany(
  inventoryAdapter.getInitialState(),
  INVENTORY,
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<InventoryFormValues>) {
      const ids = state.ids as number[];
      const nextId = ids.reduce((max, id) => Math.max(max, id), 0) + 1;
      inventoryAdapter.addOne(state, {
        ...action.payload,
        id: nextId,
        status: statusFromStock(action.payload.stock),
      });
    },
    updateItem(state, action: PayloadAction<{ id: number; values: InventoryFormValues }>) {
      inventoryAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          ...action.payload.values,
          status: statusFromStock(action.payload.values.stock),
        },
      });
    },
    deleteItem(state, action: PayloadAction<number>) {
      inventoryAdapter.removeOne(state, action.payload);
    },
    hydrateInventory(_state, action: PayloadAction<InventoryState>) {
      // Replace wholesale when restoring persisted state; ignore malformed input.
      if (action.payload && Array.isArray(action.payload.ids)) return action.payload;
      return _state;
    },
  },
});

/** Memoised entity selectors (selectAll / selectById / selectTotal / …). */
export const inventorySelectors = inventoryAdapter.getSelectors(
  (state: { inventory: InventoryState }) => state.inventory,
);

export const { addItem, updateItem, deleteItem, hydrateInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
