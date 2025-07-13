import { useContext, useCallback, memo } from "react";
import { AgeContext } from "../context/AgeProvider";
import DatePicker from "./DatePicker";

const AgeForm = () => {
  const context = useContext(AgeContext);
  if (!context) return null;

  const { state, dispatch } = context;

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

      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Date of Birth
        </label>
        <DatePicker id="dob" selectedDate={state.dob} onChange={handleDobChange} maxDate={new Date()} />
      </div>

      <div>
        <label htmlFor="futureDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Calculate Age as of
        </label>
        <DatePicker
          id="futureDate"
          selectedDate={state.futureDate}
          onChange={handleFutureDateChange}
          minDate={state.dob || undefined}
        />
      </div>

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

export default memo(AgeForm);
