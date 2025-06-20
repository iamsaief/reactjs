/**
 * Redux Store Configuration
 *
 * Central store configuration using Redux Toolkit for state management.
 * This provides a scalable foundation for managing application state
 * across components with better performance and developer experience.
 */

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import uiReducer from "./slices/uiSlice";
import userReducer from "./slices/userSlice";
import dataReducer from "./slices/dataSlice";

/**
 * Configure the Redux store with middleware and dev tools
 * RTK Query is included by default for API state management
 */
export const store = configureStore({
  reducer: {
    ui: uiReducer, // UI state (sidebar, theme, modals)
    user: userReducer, // User authentication and profile
    data: dataReducer, // Application data (tables, analytics)
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
