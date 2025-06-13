import { Injectable } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { BehaviorSubject } from 'rxjs';
import moment from 'moment';
import { getLast7DaysDate } from 'src/app/pages/shared/utils/date.utils';

@Injectable()
export class FilterService {
  private dateRangeSubject = new BehaviorSubject<DateRange<moment.Moment>>(
    new DateRange<moment.Moment>(getLast7DaysDate(), moment()),
  );
  dateRange$ = this.dateRangeSubject.asObservable();

  constructor() {}

  setDateRange(dateRange: DateRange<moment.Moment>) {
    this.dateRangeSubject.next(dateRange);
  }
}
