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

/**
 * Gets the number of days in a specific month of a specific year.
 * @param year The full year (e.g., 2024).
 * @param month The month index (0-11).
 * @returns The number of days in the month.
 */
export const getDaysInMonth = (year, month) => {
  // A trick: new Date(year, month + 1, 0) gives the last day of the *previous* month.
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Gets the day of the week for the first day of a given month.
 * @param year The full year.
 * @param month The month index (0-11).
 * @returns The day of the week index (0=Sunday, 1=Monday, ...).
 */
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};
