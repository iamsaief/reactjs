import { calculateAge, calculateNextBirthdayCountdown, calculateTotalDays } from "../utils/dateUtils";

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

export function ageReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_DOB":
      return { ...state, dob: action.payload };
    case "SET_FUTURE_DATE":
      return { ...state, futureDate: action.payload };
    case "CALCULATE_AGE":
      if (!state.dob) return state;
      const targetDate = state.futureDate || new Date();
      return {
        ...state,
        age: calculateAge(state.dob, targetDate),
        totalDays: calculateTotalDays(state.dob, targetDate),
        nextBirthdayCountdown: calculateNextBirthdayCountdown(state.dob),
      };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "SET_QUOTE_LOADING":
      return { ...state, isLoadingQuote: action.payload };
    case "SET_QUOTE":
      return { ...state, quote: action.payload, isLoadingQuote: false };
    case "RESET_STATE":
      return {
        ...initialState,
        theme: state.theme, // Keep the theme
        futureDate: new Date(),
      };
    default:
      return state;
  }
}
