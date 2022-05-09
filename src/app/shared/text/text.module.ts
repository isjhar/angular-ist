import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultDatePipe } from './default-date.pipe';

@NgModule({
  declarations: [DefaultDatePipe],
  exports: [DefaultDatePipe],
  imports: [CommonModule],
})
export class TextModule {}
