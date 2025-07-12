export const calculateAge = (dob, targetDate) => {
  let years = targetDate.getFullYear() - dob.getFullYear();
  let months = targetDate.getMonth() - dob.getMonth();
  let days = targetDate.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

export const calculateTotalDays = (dob, targetDate) => {
  if (dob > targetDate) return 0;
  const diffTime = Math.abs(targetDate.getTime() - dob.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateNextBirthdayCountdown = (dob) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  if (nextBirthday.getTime() === today.getTime()) {
    return { months: 0, days: 0, isToday: true };
  }

  let months = 0;
  let days = 0;

  let tempDate = new Date(today);

  while (tempDate < nextBirthday) {
    let tempYear = tempDate.getFullYear();
    let tempMonth = tempDate.getMonth();

    tempDate.setMonth(tempMonth + 1);

    if (tempDate > nextBirthday) {
      tempDate.setMonth(tempMonth); // revert
      break;
    }
    months++;
  }

  const diffTime = Math.abs(nextBirthday.getTime() - tempDate.getTime());
  days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return { months, days, isToday: false };
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};
