import { DatePipe } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DATE_FORMATS } from 'src/app/date-formats';

@Pipe({ name: 'defaultMonth' })
export class DefaultMonthPipe implements PipeTransform {
  localeId = inject(LOCALE_ID);
  datePipe: DatePipe;
  constructor() {
    this.datePipe = new DatePipe(this.localeId);
  }

  transform(value: string | Date | number | undefined): string | null {
    return this.datePipe.transform(value, DATE_FORMATS.month);
  }
}
