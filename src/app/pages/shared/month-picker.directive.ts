import {
  AfterViewInit,
  DestroyRef,
  Directive,
  contentChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import { MONTH_DATE_FORMATS } from 'src/app/date-formats';

@Directive({
  selector: 'mat-form-field[appMonthPicker]',
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MONTH_DATE_FORMATS,
    },
  ],
})
export class MonthPickerDirective implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly picker =
    contentChild.required<MatDatepicker<Date>>(MatDatepicker);

  ngAfterViewInit(): void {
    const picker = this.picker();
    picker.startView = 'year';
    picker.monthSelected
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((normalizedMonth) => {
        picker.select(normalizedMonth);
        picker.close();
      });
  }
}
