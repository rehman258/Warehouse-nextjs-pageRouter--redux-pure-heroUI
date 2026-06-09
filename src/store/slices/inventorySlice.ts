import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { INVENTORY, statusFromStock } from "@/lib/seed";
import type { InventoryFormValues, InventoryItem } from "@/lib/types";

export interface InventoryState {
  items: InventoryItem[];
}

const initialState: InventoryState = { items: INVENTORY };

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<InventoryFormValues>) {
      const nextId = state.items.reduce((max, it) => Math.max(max, it.id), 0) + 1;
      state.items.unshift({
        ...action.payload,
        id: nextId,
        status: statusFromStock(action.payload.stock),
      });
    },
    updateItem(state, action: PayloadAction<{ id: number; values: InventoryFormValues }>) {
      const target = state.items.find((it) => it.id === action.payload.id);
      if (!target) return;
      Object.assign(target, action.payload.values, {
        status: statusFromStock(action.payload.values.stock),
      });
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((it) => it.id !== action.payload);
    },
    hydrateInventory(state, action: PayloadAction<Partial<InventoryState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { addItem, updateItem, deleteItem, hydrateInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
