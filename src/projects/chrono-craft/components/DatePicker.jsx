import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { getDaysInMonth, getFirstDayOfMonth } from "../utils/dateUtils";

const DatePicker = ({ id, selectedDate, onChange, minDate, maxDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("days");
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  const pickerRef = useRef(null);

  const years = useMemo(() => Array.from({ length: 12 }, (_, i) => viewDate.getFullYear() - 6 + i), [viewDate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  useEffect(() => {
    if (selectedDate) {
      setViewDate(selectedDate);
    }
  }, [selectedDate]);

  const handleDateSelect = useCallback(
    (day) => {
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      onChange(newDate);
      setIsOpen(false);
    },
    [onChange, viewDate]
  );

  const handleMonthSelect = useCallback(
    (month) => {
      setViewDate(new Date(viewDate.getFullYear(), month, 1));
      setView("days");
    },
    [viewDate]
  );

  const handleYearSelect = useCallback(
    (year) => {
      setViewDate(new Date(year, viewDate.getMonth(), 1));
      setView("months");
    },
    [viewDate]
  );

  const prevMonth = useCallback(() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)), []);
  const nextMonth = useCallback(() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)), []);
  const prevYear = useCallback(() => setViewDate((d) => new Date(d.getFullYear() - 1, d.getMonth(), 1)), []);
  const nextYear = useCallback(() => setViewDate((d) => new Date(d.getFullYear() + 1, d.getMonth(), 1)), []);
  const prevYearRange = useCallback(() => setViewDate((d) => new Date(d.getFullYear() - 12, d.getMonth(), 1)), []);
  const nextYearRange = useCallback(() => setViewDate((d) => new Date(d.getFullYear() + 12, d.getMonth(), 1)), []);

  const handleViewChange = useCallback(() => {
    setView((v) => (v === "days" ? "months" : "years"));
  }, []);

  const renderDays = useCallback(() => {
    const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS_OF_WEEK_SHORT.map((day) => (
          <div key={day} className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {day}
          </div>
        ))}
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
          date.setHours(0, 0, 0, 0);
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);

          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              disabled={isDisabled}
              className={`w-9 h-9 rounded-full transition-colors duration-150 ${
                isSelected ? "bg-[rgb(79_70_229)] text-white font-bold" : "hover:bg-slate-200 dark:hover:bg-slate-600"
              } ${
                isDisabled
                  ? "text-slate-400 dark:text-slate-500 cursor-not-allowed"
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

  const renderMonths = useCallback(
    () => (
      <div className="grid grid-cols-3 gap-2">
        {MONTH_NAMES.map((month, index) => (
          <button
            key={month}
            onClick={() => handleMonthSelect(index)}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            {month.substring(0, 3)}
          </button>
        ))}
      </div>
    ),
    [handleMonthSelect]
  );

  const renderYears = useCallback(
    () => (
      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearSelect(year)}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            {year}
          </button>
        ))}
      </div>
    ),
    [years, handleYearSelect]
  );

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
      <button
        id={id}
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex justify-between items-center px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-[rgb(79_70_229)] focus:border-[rgb(79_70_229)] sm:text-sm"
      >
        <span>{selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}</span>
        <CalendarIcon className="h-5 w-5 text-slate-400" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-4 border border-slate-200 dark:border-slate-700 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={view === "days" ? prevMonth : view === "months" ? prevYear : prevYearRange}
              className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <ChevronLeftIcon />
            </button>
            <button onClick={handleViewChange} className="font-semibold text-[rgb(99_102_241)] hover:underline">
              {view === "days" && `${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
              {view === "months" && viewDate.getFullYear()}
              {view === "years" && `${years[0]} - ${years[years.length - 1]}`}
            </button>
            <button
              onClick={view === "days" ? nextMonth : view === "months" ? nextYear : nextYearRange}
              className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <ChevronRightIcon />
            </button>
          </div>
          {view === "days" && renderDays()}
          {view === "months" && renderMonths()}
          {view === "years" && renderYears()}
          <div className="flex justify-between mt-4 text-sm">
            <button onClick={handleTodayClick} className="font-medium text-[rgb(79_70_229)] hover:underline">
              Today
            </button>
            <button onClick={handleClearClick} className="font-medium text-red-500 hover:underline">
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DatePicker);

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

export const DAYS_OF_WEEK_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
