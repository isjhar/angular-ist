export function getLast7DaysDate(): Date {
  return getLastNDaysDate(6);
}

export function getLast30DaysDate(): Date {
  return getLastNDaysDate(29);
}

export function getLastNDaysDate(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

export function isSameDate(d1: Date, d2: Date): boolean {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() == d2.getFullYear() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getDay() == d2.getDay()
  );
}
