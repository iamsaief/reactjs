/**
 * User State Slice
 *
 * Manages user authentication, profile information, and user preferences.
 * This slice can be extended to include authentication tokens, user roles,
 * and other user-specific data.
 */

import { createSlice } from "@reduxjs/toolkit";

// Initial state for user management
const initialState = {
  currentUser: {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  isAuthenticated: true,
  preferences: {
    language: "en",
    timezone: "UTC",
    emailNotifications: true,
    pushNotifications: false,
  },
};

/**
 * User slice for authentication and profile management
 */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set current user data
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },

    // Clear user data on logout
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },

    // Update user preferences
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    // Update user profile
    updateProfile: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

// Export actions
export const { setUser, clearUser, updatePreferences, updateProfile } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
