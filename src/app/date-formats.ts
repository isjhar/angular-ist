export const DATE_FORMATS = {
  date: 'dd MMM yyyy',
  time: 'HH:mm',
  dateTime: 'dd MMM yyyy HH:mm:ss',
  month: 'MMM yyyy',
};

export const MONTH_DATE_FORMATS = {
  parse: {
    dateInput: DATE_FORMATS.month,
    timeInput: DATE_FORMATS.time,
  },
  display: {
    dateInput: DATE_FORMATS.month,
    monthLabel: DATE_FORMATS.month,
    dateA11yLabel: 'PP',
    monthYearA11yLabel: 'MMMM yyyy',
    monthYearLabel: DATE_FORMATS.month,
    timeInput: DATE_FORMATS.time,
    timeOptionLabel: DATE_FORMATS.time,
  },
};
