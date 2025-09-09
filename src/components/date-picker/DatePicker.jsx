import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  getDaysInMonth,
  getFirstDayOfMonth,
  MONTH_NAMES,
  DAYS_OF_WEEK_SHORT,
  CalendarIcon,
} from "./helpers";

export default function DatePickerDemo() {
  const [dateBasic, setDateBasic] = useState(null);
  const [dateGreen, setDateGreen] = useState(null);
  const [dateYearView, setDateYearView] = useState(null);
  const [dateCustomFmt, setDateCustomFmt] = useState(null);
  const [dateNoFooter, setDateNoFooter] = useState(null);

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Date Picker</h1>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="dp-basic"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Basic
          </label>
          <DatePicker
            id="dp-basic"
            selectedDate={dateBasic}
            onChange={setDateBasic}
            placeholder="Select a date"
            accentColor="#7525ff"
          />
        </div>

        <div>
          <label
            htmlFor="dp-green"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Custom Accent + Min/Max
          </label>
          <DatePicker
            id="dp-green"
            selectedDate={dateGreen}
            onChange={setDateGreen}
            minDate={new Date("2025-08-01")}
            maxDate={new Date("2025-08-31")}
            accentColor="#10b981"
            placeholder="Any day in Aug 2025"
          />
        </div>

        <div>
          <label
            htmlFor="dp-year"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Years/Month view
          </label>
          <DatePicker
            id="dp-year"
            selectedDate={dateYearView}
            onChange={setDateYearView}
            defaultView="years"
            accentColor="#f59e0b"
            placeholder="Pick a year/month"
          />
        </div>

        <div>
          <label
            htmlFor="dp-custom-fmt"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Custom display format
          </label>
          <DatePicker
            id="dp-custom-fmt"
            selectedDate={dateCustomFmt}
            onChange={setDateCustomFmt}
            formatDate={(d) =>
              d.toLocaleDateString(undefined, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            }
            accentColor="#3b82f6"
            placeholder="e.g., Tue, Jan 2, 2024"
          />
        </div>

        <div>
          <label
            htmlFor="dp-no-footer"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            No Footer actions (Today/Clear)
          </label>
          <DatePicker
            id="dp-no-footer"
            selectedDate={dateNoFooter}
            onChange={setDateNoFooter}
            showToday={false}
            showClear={false}
            accentColor="#ef4444"
            placeholder="Footer actions hidden"
          />
        </div>
      </div>
    </>
  );
}

/**
 * A fully custom, reusable, and accessible DatePicker component.
 * It supports day, month, and year views, keyboard navigation, and min/max date constraints.
 */
const DatePickerMain = ({
  id,
  selectedDate,
  onChange,
  minDate,
  maxDate,
  accentColor,
  placeholder = "Select a date",
  formatDate,
  defaultView = "days",
  className,
  popoverClassName,
  onOpenChange,
  showToday = true,
  showClear = true,
}) => {
  // State for controlling the picker's visibility.
  const [isOpen, setIsOpen] = useState(false);
  // State for the current view (days, months, or years).
  const [view, setView] = useState(defaultView);
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
        if (onOpenChange) onOpenChange(false);
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
        if (onOpenChange) onOpenChange(false);
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
      if (onOpenChange) onOpenChange(false);
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
                  ? "bg-[var(--accent)] font-bold text-white"
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
    <div
      className="relative"
      ref={pickerRef}
      style={accentColor ? { "--accent": accentColor } : undefined}
    >
      {/* The main input-like button that opens the picker */}
      <button
        id={id}
        onClick={() => {
          setIsOpen((o) => {
            const next = !o;
            if (onOpenChange) onOpenChange(next);
            return next;
          });
        }}
        className={cn(
          "flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-left shadow-sm focus:border-[rgb(79_70_229)] focus:ring-1 focus:ring-[rgb(79_70_229)] focus:outline-none sm:text-sm dark:border-slate-600 dark:bg-slate-800",
          accentColor &&
            "focus:border-[var(--accent)] focus:ring-[var(--accent)]",
          className,
        )}
      >
        <span>
          {selectedDate
            ? typeof formatDate === "function"
              ? formatDate(selectedDate)
              : selectedDate.toLocaleDateString()
            : placeholder}
        </span>
        <CalendarIcon className="h-5 w-5 text-slate-400" />
      </button>
      {/* The popover calendar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "absolute z-10 mt-2 w-72 rounded-lg border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-800",
              popoverClassName,
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
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
                className={cn(
                  "font-semibold hover:underline",
                  accentColor && "text-[var(--accent)]",
                )}
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
            {(showToday || showClear) && (
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  {showToday && (
                    <button
                      onClick={handleTodayClick}
                      className={cn(
                        "font-medium text-[rgb(79_70_229)] hover:underline",
                        accentColor && "text-[var(--accent)]",
                      )}
                    >
                      Today
                    </button>
                  )}
                </div>
                <div>
                  {showClear && (
                    <button
                      onClick={handleClearClick}
                      className="font-medium text-red-500 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DatePicker = memo(DatePickerMain);
