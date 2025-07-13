import { createContext, useReducer, useEffect, ReactNode, Dispatch, useMemo } from "react";
import { ageReducer, initialState as baseInitialState } from "./ageReducer";

// Create a React Context for the application state.
// This will provide the state and dispatch function to any component that needs it.
export const AgeContext = createContext(undefined);

/**
 * Initializer function for the useReducer hook. This runs only on the initial render.
 * It determines the initial theme by checking localStorage first, then falling back
 * to the user's OS-level preference. This prevents a "theme flash" on load.
 * @param initialState The base initial state from the reducer file.
 * @returns The computed initial state including the correct theme.
 */
const init = (initialState) => {
  // Check for a user-saved theme in localStorage first.
  const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  if (savedTheme) {
    return { ...initialState, theme: savedTheme };
  }

  // If no saved theme, fall back to the user's system preference.
  const prefersDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return { ...initialState, theme: prefersDark ? "dark" : "light" };
};

/**
 * The AgeProvider component. It wraps parts of the app that need access to the age-related state.
 * It uses a reducer for predictable state management.
 */
export const AgeProvider = ({ children }) => {
  // Initialize the reducer. The `init` function sets up the theme correctly on first load.
  const [state, dispatch] = useReducer(ageReducer, baseInitialState, init);

  // Effect to apply the theme to the DOM and persist the user's choice.
  // This runs whenever state.theme changes.
  useEffect(() => {
    if (state.theme) {
      localStorage.setItem("theme", state.theme);
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [state.theme]);

  // Effect to automatically trigger age calculation whenever the
  // date of birth or the "calculate as of" date changes.
  useEffect(() => {
    if (state.dob) {
      dispatch({ type: "CALCULATE_AGE" });
    }
  }, [state.dob, state.futureDate]);

  // Memoize the context value to prevent unnecessary re-renders of consumer components.
  // The value object is only recreated if the `state` object changes.
  // This is a critical performance optimization for context.
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <AgeContext.Provider value={contextValue}>{children}</AgeContext.Provider>;
};
