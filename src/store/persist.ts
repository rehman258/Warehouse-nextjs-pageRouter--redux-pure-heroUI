import type { RootState } from "./index";
import type { InventoryState } from "./slices/inventorySlice";
import type { OrdersState } from "./slices/ordersSlice";
import type { UiState } from "./slices/uiSlice";

const KEY = "wareflow:state";

export interface PersistedState {
  inventory?: InventoryState;
  orders?: OrdersState;
  ui?: UiState;
}

export function loadPersisted(): PersistedState | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PersistedState) : undefined;
  } catch {
    return undefined;
  }
}

export function savePersisted(state: RootState): void {
  if (typeof window === "undefined") return;
  try {
    const payload: PersistedState = {
      inventory: state.inventory,
      orders: state.orders,
      ui: state.ui,
    };
    window.localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    /* storage unavailable */
  }
}
