import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultNumber',
})
export class DefaultNumberPipe implements PipeTransform {
  numberPipe = new DecimalPipe('en');

  transform(value: string): string | null {
    return this.numberPipe.transform(value, '1.0-0');
  }
}
