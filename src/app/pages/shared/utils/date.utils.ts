import moment from 'moment';

export function getLast7DaysDate(): moment.Moment {
  return getLastNDaysDate(6);
}

export function getLast30DaysDate(): moment.Moment {
  return getLastNDaysDate(29);
}

export function getLastNDaysDate(days: number): moment.Moment {
  return moment().subtract(days, 'days');
}

export function isSameDate(d1: moment.Moment, d2: moment.Moment): boolean {
  if (!d1 || !d2) return false;
  return d1.isSame(d2, 'day');
}
