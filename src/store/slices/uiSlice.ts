import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { NOTIFICATIONS, PREFERENCES } from "@/lib/seed";
import type { AppNotification, Preferences } from "@/lib/types";

export interface UiState {
  sidebarOpen: boolean;
  notifications: AppNotification[];
  preferences: Preferences;
}

const initialState: UiState = {
  sidebarOpen: false,
  notifications: NOTIFICATIONS,
  preferences: PREFERENCES,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebar(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    markAllNotificationsRead(state) {
      state.notifications.forEach((n) => (n.unread = false));
    },
    updatePreferences(state, action: PayloadAction<Partial<Preferences>>) {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    hydrateUi(state, action: PayloadAction<Partial<UiState>>) {
      return { ...state, ...action.payload, sidebarOpen: false };
    },
  },
});

export const {
  setSidebar, toggleSidebar, markAllNotificationsRead, updatePreferences, hydrateUi,
} = uiSlice.actions;
export default uiSlice.reducer;
