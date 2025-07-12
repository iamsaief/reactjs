import { createContext, useReducer, useEffect, ReactNode, Dispatch, useMemo } from "react";
import { ageReducer, initialState as baseInitialState } from "./ageReducer";

export const AgeContext = createContext(undefined);

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

export const AgeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ageReducer, baseInitialState, init);

  useEffect(() => {
    // This effect applies the theme to the DOM and saves the user's choice.
    if (state.theme) {
      localStorage.setItem("theme", state.theme);
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [state.theme]);

  useEffect(() => {
    if (state.dob) {
      dispatch({ type: "CALCULATE_AGE" });
    }
  }, [state.dob, state.futureDate]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return <AgeContext.Provider value={contextValue}>{children}</AgeContext.Provider>;
};
