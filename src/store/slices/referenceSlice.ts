import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES, STATUSES, SUPPLIERS } from "@/lib/seed";
import type { Category, StockStatusMeta, Supplier } from "@/lib/types";

export interface ReferenceState {
  categories: Category[];
  statuses: StockStatusMeta[];
  suppliers: Supplier[];
}

const initialState: ReferenceState = {
  categories: CATEGORIES,
  statuses: STATUSES,
  suppliers: SUPPLIERS,
};

const referenceSlice = createSlice({
  name: "reference",
  initialState,
  reducers: {},
});

export default referenceSlice.reducer;
