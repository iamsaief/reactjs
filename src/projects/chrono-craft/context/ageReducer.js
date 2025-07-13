import { calculateAge, calculateNextBirthdayCountdown, calculateTotalDays } from "../utils/dateUtils";

// Defines the initial state for the entire application.
export const initialState = {
  name: "",
  dob: null,
  futureDate: new Date(),
  age: null,
  totalDays: null,
  nextBirthdayCountdown: null,
  quote: "",
  isLoadingQuote: false,
  theme: "light",
};

/**
 * The main reducer function for the application.
 * It handles state transitions based on dispatched actions in a predictable, immutable way.
 * @param state The current state.
 * @param action The action to perform.
 * @returns The new state.
 */
export function ageReducer(state, action) {
  switch (action.type) {
    // Updates the user's name.
    case "SET_NAME":
      return { ...state, name: action.payload };

    // Updates the user's date of birth.
    case "SET_DOB":
      return { ...state, dob: action.payload };

    // Updates the target date for age calculation.
    case "SET_FUTURE_DATE":
      return { ...state, futureDate: action.payload };

    // Performs all age-related calculations.
    case "CALCULATE_AGE":
      if (!state.dob) return state; // Can't calculate without a date of birth.
      const targetDate = state.futureDate || new Date();
      return {
        ...state,
        age: calculateAge(state.dob, targetDate),
        totalDays: calculateTotalDays(state.dob, targetDate),
        nextBirthdayCountdown: calculateNextBirthdayCountdown(state.dob),
      };

    // Toggles the UI theme between 'light' and 'dark'.
    case "SET_THEME":
      return { ...state, theme: action.payload };

    // Sets the loading state for the quote fetching process.
    case "SET_QUOTE_LOADING":
      return { ...state, isLoadingQuote: action.payload };

    // Sets the fetched quote and disables the loading state.
    case "SET_QUOTE":
      return { ...state, quote: action.payload, isLoadingQuote: false };

    // Resets the form and calculation results to their initial state.
    case "RESET_STATE":
      return {
        ...initialState,
        theme: state.theme, // Persist the user's chosen theme.
        futureDate: new Date(), // Reset future date to today.
      };

    // Returns the current state if the action is not recognized.
    default:
      return state;
  }
}
