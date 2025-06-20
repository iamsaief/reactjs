/**
 * Theme Context and Provider
 *
 * Provides theme management functionality across the application including:
 * - Light, dark, and system theme modes
 * - Automatic system theme detection
 * - Theme persistence in localStorage
 * - Real-time theme switching with CSS class updates
 *
 * This context works alongside Redux but handles theme-specific logic
 * for better separation of concerns.
 */

import { createContext, useContext, useEffect, useState } from "react";

// Create context with undefined default (requires provider)
const ThemeContext = createContext(undefined);

/**
 * Theme Provider Component
 *
 * Wraps the application to provide theme functionality.
 * Handles theme persistence, system preference detection,
 * and DOM updates for theme changes.
 */
export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default to system
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme || "system";
    }
    return "system";
  });

  // Track the actual resolved theme (light/dark)
  const [actualTheme, setActualTheme] = useState("light");

  /**
   * Effect to handle theme changes and DOM updates
   * Listens for system theme changes when theme is set to 'system'
   */
  useEffect(() => {
    const root = window.document.documentElement;

    /**
     * Update the actual theme and apply CSS classes
     * Resolves 'system' theme to actual light/dark preference
     */
    const updateTheme = () => {
      let newActualTheme = "light";

      if (theme === "system") {
        // Use system preference when theme is set to system
        newActualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } else {
        // Use explicit theme preference
        newActualTheme = theme;
      }

      // Update state and DOM classes
      setActualTheme(newActualTheme);
      root.classList.remove("light", "dark");
      root.classList.add(newActualTheme);
    };

    // Apply theme immediately
    updateTheme();

    // Persist theme preference
    localStorage.setItem("theme", theme);

    // Listen for system theme changes when using system theme
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateTheme);

      // Cleanup listener on unmount or theme change
      return () => mediaQuery.removeEventListener("change", updateTheme);
    }
  }, [theme]);

  // Provide theme context to children
  return <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>{children}</ThemeContext.Provider>;
}

/**
 * Custom hook to use theme context
 *
 * Provides easy access to theme state and functions.
 * Throws error if used outside of ThemeProvider.
 *
 * @returns Theme context with current theme and setter
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
