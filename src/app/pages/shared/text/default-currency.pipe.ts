import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultCurrency',
})
export class DefaultCurrencyPipe implements PipeTransform {
  numberPipe = new DecimalPipe('en');

  transform(value: string | number): string | null {
    return this.numberPipe.transform(value, '1.0-0');
  }
}
