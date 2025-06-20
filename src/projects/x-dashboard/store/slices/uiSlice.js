/**
 * UI State Slice
 *
 * Manages global UI state including sidebar visibility, theme preferences,
 * modal states, and other interface-related state that needs to be shared
 * across components.
 */

import { createSlice } from "@reduxjs/toolkit";

// Initial state with sensible defaults
const initialState = {
  sidebarCollapsed: false,
  theme: "system",
  notifications: 3,
  isLoading: false,
  activeModal: null,
};

/**
 * UI slice with actions for managing interface state
 */
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Toggle sidebar collapsed state
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    // Set sidebar collapsed state explicitly
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },

    // Update theme preference
    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    // Update notification count
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },

    // Set global loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Manage modal visibility
    setActiveModal: (state, action) => {
      state.activeModal = action.payload;
    },
  },
});

// Export actions for use in components
export const { toggleSidebar, setSidebarCollapsed, setTheme, setNotifications, setLoading, setActiveModal } =
  uiSlice.actions;

// Export reducer for store configuration
export default uiSlice.reducer;
