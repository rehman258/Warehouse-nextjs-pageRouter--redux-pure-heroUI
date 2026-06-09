import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ORDERS } from "@/lib/seed";
import type { Order } from "@/lib/types";

export interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = { items: ORDERS };

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    deleteOrder(state, action: PayloadAction<string>) {
      state.items = state.items.filter((o) => o.id !== action.payload);
    },
    hydrateOrders(state, action: PayloadAction<Partial<OrdersState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { deleteOrder, hydrateOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
