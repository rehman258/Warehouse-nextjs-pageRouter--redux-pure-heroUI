import { configureStore } from "@reduxjs/toolkit";
import inventory from "./slices/inventorySlice";
import orders from "./slices/ordersSlice";
import reference from "./slices/referenceSlice";
import ui from "./slices/uiSlice";

export const makeStore = () =>
  configureStore({
    reducer: { inventory, orders, reference, ui },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
