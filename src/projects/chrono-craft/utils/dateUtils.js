/**
 * Calculates the precise age in years, months, and days.
 * @param dob The date of birth.
 * @param targetDate The date to calculate the age against (e.g., today or a future date).
 * @returns An object containing the calculated years, months, and days.
 */
export const calculateAge = (dob, targetDate) => {
  let years = targetDate.getFullYear() - dob.getFullYear();
  let months = targetDate.getMonth() - dob.getMonth();
  let days = targetDate.getDate() - dob.getDate();

  // If days are negative, it means the current day of the month hasn't
  // "passed" the birth day of the month yet. So, we borrow from months.
  if (days < 0) {
    months--;
    // Get the last day of the previous month to know how many days to add.
    const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // If months are negative, it means the current month hasn't "passed"
  // the birth month yet. So, we borrow from years.
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

/**
 * Calculates the total number of days between two dates.
 * @param dob The start date (date of birth).
 * @param targetDate The end date.
 * @returns The total number of full days lived.
 */
export const calculateTotalDays = (dob, targetDate) => {
  if (dob > targetDate) return 0;
  // Get the difference in milliseconds and convert to days.
  const diffTime = Math.abs(targetDate.getTime() - dob.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calculates the time remaining until the next birthday from today.
 * @param dob The date of birth.
 * @returns An object with remaining months and days, and a flag for if it's the birthday.
 */
export const calculateNextBirthdayCountdown = (dob) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to the start of the day.

  let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

  // If the birthday for this year has already passed, set it to next year.
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  // Check if today is the birthday.
  if (nextBirthday.getTime() === today.getTime()) {
    return { months: 0, days: 0, isToday: true };
  }

  // --- Calculate months and days until the next birthday ---
  let months = 0;
  let days = 0;

  let tempDate = new Date(today);

  // Increment months one by one until we pass the target birthday month.
  while (tempDate < nextBirthday) {
    let tempYear = tempDate.getFullYear();
    let tempMonth = tempDate.getMonth();

    tempDate.setMonth(tempMonth + 1);

    // If we've overshot the target date, revert the month and break.
    if (tempDate > nextBirthday) {
      tempDate.setMonth(tempMonth); // revert
      break;
    }
    months++;
  }

  // Calculate the remaining days.
  const diffTime = Math.abs(nextBirthday.getTime() - tempDate.getTime());
  days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return { months, days, isToday: false };
};

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
