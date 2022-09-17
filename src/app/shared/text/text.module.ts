import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDatePipe } from './default-date.pipe';
import { DefaultCurrencyPipe } from './default-currency.pipe';
import { DefaultNumberPipe } from './default-number.pipe';

@NgModule({
  declarations: [DefaultDatePipe, DefaultCurrencyPipe, DefaultNumberPipe],
  exports: [DefaultDatePipe, DefaultCurrencyPipe, DefaultNumberPipe],
  imports: [CommonModule],
})
export class TextModule {}
