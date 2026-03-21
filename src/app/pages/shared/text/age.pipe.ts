import { Pipe, PipeTransform } from '@angular/core';
import {
  formatDistanceToNow,
  formatDuration,
  intervalToDuration,
} from 'date-fns';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: Date | null): string {
    if (!value) return '-';
    const start = new Date(value);
    const end = new Date();

    const { years, months, days } = intervalToDuration({ start, end });
    if (years && years > 0) {
      return `${years} years`;
    }
    if (months && months > 0) {
      return `${months} months`;
    }
    return `${days} days`;
  }
}
