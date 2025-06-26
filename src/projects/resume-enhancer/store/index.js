/**
 * Redux Store Configuration using Redux Toolkit for state management.
 */
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import resumeReducer from "./slices/resumeSlice";

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
