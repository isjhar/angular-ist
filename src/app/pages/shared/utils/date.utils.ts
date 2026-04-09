export function getLast7DaysDate(): Date {
  return getLastNDaysDate(6);
}

export function getLast30DaysDate(): Date {
  return getLastNDaysDate(29);
}

export function getYesterdayDate(): Date {
  return getLastNDaysDate(1);
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
    d1.getDate() == d2.getDate()
  );
}

export function getTodayDayIndex(): number {
  const date = new Date();
  return date.getDay();
}

export function getTodayFirstTime(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getTodayLastTime(): Date {
  const date = new Date();
  date.setHours(23, 59, 59, 999);
  return date;
}

export function convertToRoundedHour(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 2. Convert to total decimal hours (e.g., 3.5)
  const decimalHour = hours + minutes / 60;

  // 3. Round to the nearest integer
  return Math.round(decimalHour);
}

export function convertToCeiledHour(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 2. Convert to total decimal hours (e.g., 3.5)
  const decimalHour = hours + minutes / 60;

  // 3. Round to the nearest integer
  return Math.ceil(decimalHour);
}

export function convertToHour(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 2. Convert to total decimal hours (e.g., 3.5)
  const decimalHour = hours + minutes / 60;
  return decimalHour;
}
