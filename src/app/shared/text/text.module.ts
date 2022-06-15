import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDatePipe } from './default-date.pipe';
import { DefaultCurrencyPipe } from './default-currency.pipe';

@NgModule({
  declarations: [DefaultDatePipe, DefaultCurrencyPipe],
  exports: [DefaultDatePipe, DefaultCurrencyPipe],
  imports: [CommonModule],
})
export class TextModule {}
