import { useContext, useCallback, memo } from "react";
import { AgeContext } from "../context/AgeProvider";
import DatePicker from "./DatePicker";

/**
 * The main form component for user input.
 * It includes fields for name, date of birth, and a target date for calculation.
 */
const AgeForm = () => {
  const context = useContext(AgeContext);
  if (!context) return null;

  const { state, dispatch } = context;

  // --- Memoized Event Handlers ---
  // useCallback is used to memoize these functions so they are not recreated on every render.
  // This prevents unnecessary re-renders of child components (like DatePicker) that receive these functions as props.
  const handleNameChange = useCallback(
    (e) => {
      dispatch({ type: "SET_NAME", payload: e.target.value });
    },
    [dispatch]
  );

  const handleDobChange = useCallback(
    (date) => {
      dispatch({ type: "SET_DOB", payload: date });
    },
    [dispatch]
  );

  const handleFutureDateChange = useCallback(
    (date) => {
      dispatch({ type: "SET_FUTURE_DATE", payload: date });
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET_STATE" });
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Your Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          value={state.name}
          onChange={handleNameChange}
          placeholder="e.g., Alex Doe"
          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm transition"
        />
      </div>

      {/* Date of Birth Input */}
      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Date of Birth
        </label>
        <DatePicker
          id="dob"
          selectedDate={state.dob}
          onChange={handleDobChange}
          maxDate={new Date()} // Can't be born in the future.
        />
      </div>

      <div>
        <label htmlFor="futureDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Calculate Age as of
        </label>
        <DatePicker
          id="futureDate"
          selectedDate={state.futureDate}
          onChange={handleFutureDateChange}
          minDate={state.dob || undefined} // Can't calculate age before birth.
        />
      </div>

      {/* Reset Button */}
      <div className="pt-2">
        <button
          onClick={handleReset}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 dark:focus:ring-offset-slate-800 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// Memoize the component to prevent re-renders unless its props or context values change.
export default memo(AgeForm);
