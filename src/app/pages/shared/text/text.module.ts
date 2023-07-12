import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDatePipe } from './default-date.pipe';
import { DefaultCurrencyPipe } from './default-currency.pipe';
import { DefaultNumberPipe } from './default-number.pipe';
import { DefaultDateTimePipe } from './default-date-time.pipe';

@NgModule({
  declarations: [
    DefaultDatePipe,
    DefaultCurrencyPipe,
    DefaultNumberPipe,
    DefaultDateTimePipe,
  ],
  exports: [
    DefaultDatePipe,
    DefaultCurrencyPipe,
    DefaultNumberPipe,
    DefaultDateTimePipe,
  ],
  imports: [CommonModule],
})
export class TextModule {}
