import { Injectable } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';
import { getLast7DaysDate } from 'src/app/pages/shared/utils/date.utils';

@Injectable()
export class FilterService {
  private dateRangeSubject = new BehaviorSubject<DateRange<Date>>(
    new DateRange<Date>(getLast7DaysDate(), new Date()),
  );
  dateRange$ = this.dateRangeSubject.asObservable();

  constructor() {}

  setDateRange(dateRange: DateRange<Date>) {
    this.dateRangeSubject.next(dateRange);
  }
}
