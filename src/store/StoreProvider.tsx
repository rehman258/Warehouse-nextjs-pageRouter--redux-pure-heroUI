"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";
import { loadPersisted, savePersisted } from "./persist";
import { hydrateInventory } from "./slices/inventorySlice";
import { hydrateOrders } from "./slices/ordersSlice";
import { hydrateUi } from "./slices/uiSlice";

/**
 * One store per client (App Router pattern). The first render uses the
 * deterministic seed state (SSR-safe), then localStorage overrides are applied
 * after mount and future mutations are persisted.
 */
export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (storeRef.current === null) storeRef.current = makeStore();

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;
    const persisted = loadPersisted();
    if (persisted?.inventory) store.dispatch(hydrateInventory(persisted.inventory));
    if (persisted?.orders) store.dispatch(hydrateOrders(persisted.orders));
    if (persisted?.ui) store.dispatch(hydrateUi(persisted.ui));
    return store.subscribe(() => savePersisted(store.getState()));
  }, []);

  // Reading the lazily-initialised store ref in render is the official
  // App Router + Redux Toolkit pattern (one store instance per client).
  // eslint-disable-next-line react-hooks/refs
  return <Provider store={storeRef.current}>{children}</Provider>;
}
