import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'defaultDate',
    standalone: false
})
export class DefaultDatePipe implements PipeTransform {
  datePipe = new DatePipe('en');

  transform(value: string | Date | number | undefined): string | null {
    return this.datePipe.transform(value, 'M/d/yyyy');
  }
}
