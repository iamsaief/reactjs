import { useContext, useEffect, memo } from "react";
import { AgeContext } from "../context/AgeProvider";
import { useAnimatedNumber } from "../hooks/useAnimatedNumber";
import { fetchAgeQuote } from "../services/geminiService";

/**
 * A memoized component to display a single animated numerical result.
 * @param value The target value for the number.
 * @param label The text label for the value.
 */
const ResultItem = memo(({ value, label }) => {
  // Use the custom hook to animate the number.
  const animatedValue = useAnimatedNumber(value);
  return (
    <div className="flex flex-col items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-xl animate-slide-up">
      <span className="text-4xl md:text-5xl font-bold text-[rgb(79_70_229)]">{animatedValue}</span>
      <span className="text-sm text-slate-600 dark:text-slate-400 mt-1">{label}</span>
    </div>
  );
});

/**
 * The main component for displaying all calculated results.
 * It shows the age in years/months/days, total days, and birthday countdown.
 * It also triggers the quote fetching process.
 */
export const ResultsDisplay = () => {
  const context = useContext(AgeContext);
  if (!context) return null;

  const { state, dispatch } = context;
  const { age, totalDays, nextBirthdayCountdown, dob } = state;

  // Effect to fetch a new quote whenever the calculated age (in years) changes.
  useEffect(() => {
    // Only fetch if age is calculated and is a non-negative number.
    if (age && age.years >= 0) {
      dispatch({ type: "SET_QUOTE_LOADING", payload: true });

      fetchAgeQuote(age.years).then((quoteData) => {
        dispatch({ type: "SET_QUOTE", payload: quoteData });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age?.years, dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // If no date of birth is selected, show a welcome/prompt message.
  if (!dob) {
    return (
      <div className="text-center p-8 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Let's get started!</h3>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Please select your date of birth to calculate your age.
        </p>
      </div>
    );
  }

  // If DOB is set but age hasn't been calculated yet, render nothing temporarily.
  if (!age) return null;

  return (
    <div className="space-y-6">
      {/* Primary Age Result Card */}
      <div className="p-6 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
          {/* {state.name ? `${state.name}'s Age` : "Your Age"} on {state.futureDate?.toLocaleDateString()} */}
          {state.name ? `${state.name}'s Age` : "Your Age"} on {formatDate(state.futureDate)}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <ResultItem value={age.years} label="Years" />
          <ResultItem value={age.months} label="Months" />
          <ResultItem value={age.days} label="Days" />
        </div>
      </div>

      {/* Secondary Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Days Lived Card */}
        <div className="p-6 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 animate-slide-up [animation-delay:100ms]">
          <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Total Days Lived</h4>
          <p className="text-3xl font-bold text-[rgb(99_102_241)]">{totalDays?.toLocaleString()}</p>
        </div>
        {/* Next Birthday Card */}
        <div className="p-6 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 animate-slide-up [animation-delay:200ms]">
          <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Next Birthday</h4>
          {nextBirthdayCountdown?.isToday ? (
            <p className="text-3xl font-bold text-green-500">🎉 Happy Birthday! 🎉</p>
          ) : (
            <p className="text-3xl font-bold text-[rgb(99_102_241)]">
              {nextBirthdayCountdown?.months} <span className="text-xl">months &</span> {nextBirthdayCountdown?.days}{" "}
              <span className="text-xl">days</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
