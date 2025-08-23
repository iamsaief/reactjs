import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { getDaysInMonth, getFirstDayOfMonth } from "../utils/dateUtils";

/**
 * A fully custom, reusable, and accessible DatePicker component.
 * It supports day, month, and year views, keyboard navigation, and min/max date constraints.
 */
const DatePicker = ({ id, selectedDate, onChange, minDate, maxDate }) => {
  // State for controlling the picker's visibility.
  const [isOpen, setIsOpen] = useState(false);
  // State for the current view (days, months, or years).
  const [view, setView] = useState("days");
  // State for the date that the calendar is currently displaying (e.g., which month).
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  // Ref for the main picker element to detect outside clicks.
  const pickerRef = useRef(null);
  // Memoize the calculation of the year range for the 'years' view.
  const years = useMemo(
    () => Array.from({ length: 12 }, (_, i) => viewDate.getFullYear() - 6 + i),
    [viewDate],
  );

  // Effect to handle clicks outside the date picker to close it.
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to handle the 'Escape' key press to close the picker.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Effect to update the view date when the selected date prop changes.
  useEffect(() => {
    if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [selectedDate]);

  // --- Memoized Callback Handlers ---
  // useCallback is used to ensure these functions have a stable identity across re-renders,
  // which is crucial for performance and preventing unnecessary re-renders of child elements.
  const handleDateSelect = useCallback(
    (day) => {
      const newDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        day,
      );
      onChange(newDate);
      setIsOpen(false);
    },
    [onChange, viewDate],
  );

  const handleMonthSelect = useCallback(
    (month) => {
      setViewDate(new Date(viewDate.getFullYear(), month, 1));
      setView("days"); // Switch back to the day view.
    },
    [viewDate],
  );

  const handleYearSelect = useCallback(
    (year) => {
      setViewDate(new Date(year, viewDate.getMonth(), 1));
      setView("months"); // Switch to the month view after selecting a year.
    },
    [viewDate],
  );

  // Navigation callbacks
  const prevMonth = useCallback(
    () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)),
    [],
  );
  const nextMonth = useCallback(
    () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)),
    [],
  );
  const prevYear = useCallback(
    () => setViewDate((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1)),
    [],
  );
  const nextYear = useCallback(
    () => setViewDate((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1)),
    [],
  );
  const prevYearRange = useCallback(
    () => setViewDate((d) => new Date(d.getFullYear() - 12, d.getMonth(), 1)),
    [],
  );
  const nextYearRange = useCallback(
    () => setViewDate((d) => new Date(d.getFullYear() + 12, d.getMonth(), 1)),
    [],
  );

  // Toggles between days -> months -> years views.
  const handleViewChange = useCallback(() => {
    setView((v) => (v === "days" ? "months" : "years"));
  }, []);

  // Renders the grid of days for the current month.
  const renderDays = useCallback(() => {
    const daysInMonth = getDaysInMonth(
      viewDate.getFullYear(),
      viewDate.getMonth(),
    );
    const firstDay = getFirstDayOfMonth(
      viewDate.getFullYear(),
      viewDate.getMonth(),
    );
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS_OF_WEEK_SHORT.map((day) => (
          <div
            key={day}
            className="text-xs font-bold text-slate-500 dark:text-slate-400"
          >
            {day}
          </div>
        ))}
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const date = new Date(
            viewDate.getFullYear(),
            viewDate.getMonth(),
            day,
          );
          date.setHours(0, 0, 0, 0);
          const isSelected =
            selectedDate && date.toDateString() === selectedDate.toDateString();
          const isDisabled =
            (minDate && date < minDate) || (maxDate && date > maxDate);

          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              disabled={isDisabled}
              className={`h-9 w-9 rounded-full transition-colors duration-150 ${
                isSelected
                  ? "bg-[rgb(79_70_229)] font-bold text-white"
                  : "hover:bg-slate-200 dark:hover:bg-slate-600"
              } ${
                isDisabled
                  ? "cursor-not-allowed text-slate-400 dark:text-slate-500"
                  : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    );
  }, [viewDate, selectedDate, minDate, maxDate, handleDateSelect]);

  // Renders the grid of months.
  const renderMonths = useCallback(
    () => (
      <div className="grid grid-cols-3 gap-2">
        {MONTH_NAMES.map((month, index) => (
          <button
            key={month}
            onClick={() => handleMonthSelect(index)}
            className="rounded-lg p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
          >
            {month.substring(0, 3)}
          </button>
        ))}
      </div>
    ),
    [handleMonthSelect],
  );

  // Renders the grid of years.
  const renderYears = useCallback(
    () => (
      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearSelect(year)}
            className="rounded-lg p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
          >
            {year}
          </button>
        ))}
      </div>
    ),
    [years, handleYearSelect],
  );

  // Action button callbacks
  const handleTodayClick = useCallback(() => {
    onChange(new Date());
    setIsOpen(false);
  }, [onChange]);

  const handleClearClick = useCallback(() => {
    onChange(null);
    setIsOpen(false);
  }, [onChange]);

  return (
    <div className="relative" ref={pickerRef}>
      {/* The main input-like button that opens the picker */}
      <button
        id={id}
        onClick={() => setIsOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-left shadow-sm focus:border-[rgb(79_70_229)] focus:ring-1 focus:ring-[rgb(79_70_229)] focus:outline-none sm:text-sm dark:border-slate-600 dark:bg-slate-800"
      >
        <span>
          {selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}
        </span>
        <CalendarIcon className="h-5 w-5 text-slate-400" />
      </button>
      {/* The popover calendar */}
      {isOpen && (
        <div className="animate-fade-in absolute z-10 mt-2 w-72 rounded-lg border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
          {/* Calendar Header with navigation and view switcher */}
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={
                view === "days"
                  ? prevMonth
                  : view === "months"
                    ? prevYear
                    : prevYearRange
              }
              className="rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={handleViewChange}
              className="font-semibold text-[rgb(99_102_241)] hover:underline"
            >
              {view === "days" &&
                `${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
              {view === "months" && viewDate.getFullYear()}
              {view === "years" && `${years[0]} - ${years[years.length - 1]}`}
            </button>
            <button
              onClick={
                view === "days"
                  ? nextMonth
                  : view === "months"
                    ? nextYear
                    : nextYearRange
              }
              className="rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Conditionally render the correct view */}
          {view === "days" && renderDays()}
          {view === "months" && renderMonths()}
          {view === "years" && renderYears()}

          {/* Footer with Today and Clear buttons */}
          <div className="mt-4 flex justify-between text-sm">
            <button
              onClick={handleTodayClick}
              className="font-medium text-[rgb(79_70_229)] hover:underline"
            >
              Today
            </button>
            <button
              onClick={handleClearClick}
              className="font-medium text-red-500 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DatePicker);

// Full month names, used in the DatePicker component.
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Short day of the week names, used for the header in the DatePicker calendar view.
export const DAYS_OF_WEEK_SHORT = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

/**
 * A simple, reusable SVG icon component for a calendar.
 */
export const CalendarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-5 w-5"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

/**
 * A simple, reusable SVG icon component for a left-facing chevron.
 * Used for navigation in the DatePicker.
 */
export const ChevronLeftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

/**
 * A simple, reusable SVG icon component for a right-facing chevron.
 * Used for navigation in the DatePicker.
 */
export const ChevronRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
