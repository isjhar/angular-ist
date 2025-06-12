export function getLast7DaysDate(): Date {
  return getLastNDaysDate(7);
}

export function getLast30DaysDate(): Date {
  return getLastNDaysDate(30);
}

export function getLastNDaysDate(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

export function isSameDate(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
