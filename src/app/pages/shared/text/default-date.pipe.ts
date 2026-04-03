import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DATE_FORMATS } from 'src/app/date-formats';

@Pipe({ name: 'defaultDate' })
export class DefaultDatePipe implements PipeTransform {
  datePipe = new DatePipe('en');

  transform(value: string | Date | number | undefined): string | null {
    return this.datePipe.transform(value, DATE_FORMATS.date);
  }
}
