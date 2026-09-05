import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import {
  DateRange,
  MatDatepickerInputEvent,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate,
} from '@angular/material/datepicker';
import {
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import {
  getLast7DaysDate,
  getTodayFirstTime,
  getTodayLastTime,
  getYesterdayDate,
  isSameDate,
} from 'src/app/pages/shared/utils/date.utils';

export type DateFilterOption = 'today' | 'yesterday' | 'custom';

export interface DateRangeFilter {
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'app-date-range-filter',
  imports: [
    MatFormField,
    MatLabel,
    MatDateRangeInput,
    MatDateRangePicker,
    MatHint,
    MatDatepickerToggle,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIconModule,
    ReactiveFormsModule,
    MatStartDate,
    MatEndDate,
    MatSuffix,
    FormsModule,
  ],
  templateUrl: './date-range-filter.component.html',
  styleUrl: './date-range-filter.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateRangeFilterComponent,
    },
  ],
})
export class DateRangeFilterComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  value: DateRange<Date | null> = new DateRange<Date | null>(
    getTodayFirstTime(),
    getTodayLastTime(),
  );

  filterOptionValue = 'today';
  onChange = (value: DateRange<Date | null> | null) => {};
  onTouched = () => {};

  disabled = false;
  touched = false;

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  updateDateRange(): void {
    const filterOption = this.filterOptionValue;

    switch (filterOption) {
      case 'today':
        this.value = new DateRange(new Date(), new Date());
        break;
      case 'yesterday':
        this.value = new DateRange(getYesterdayDate(), getYesterdayDate());
        break;
    }
    this.syncValueTime();
  }

  updateQuickRange(): void {
    const startDate = this.value.start;
    const endDate = this.value.end;
    const today = new Date();

    const yesterday = getYesterdayDate();

    let quickRange: DateFilterOption = 'custom';

    if (startDate != null && endDate != null) {
      if (isSameDate(endDate, today) && isSameDate(startDate, today)) {
        quickRange = 'today';
      } else if (
        isSameDate(endDate, yesterday) &&
        isSameDate(startDate, yesterday)
      ) {
        quickRange = 'yesterday';
      }
    }

    this.filterOptionValue = quickRange;
  }

  onStartChanged(event: MatDatepickerInputEvent<Date>) {
    this.value = new DateRange(event.value, this.value.end);
    this.syncValueTime();
    this.updateQuickRange();
    this.onChanged();
  }

  onEndChanged(event: MatDatepickerInputEvent<Date>) {
    this.value = new DateRange(this.value.start, event.value);
    this.syncValueTime();
    this.updateQuickRange();
    this.onChanged();
  }

  onFilterOptionChanged(event: MatButtonToggleChange) {
    this.markAsTouched();
    this.updateDateRange();
    this.onChanged();
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  writeValue(obj: DateRange<Date | null>): void {
    this.value = obj;
    this.syncValueTime();
    this.updateQuickRange();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChanged(): void {
    this.onChange(this.value);
  }

  syncValueTime(): void {
    if (this.value == null) {
      return;
    }
    const startDate = this.value.start;
    if (startDate) {
      startDate.setHours(0, 0, 0, 0);
    }

    const endDate = this.value.end;
    if (endDate) {
      endDate.setHours(23, 59, 59, 999);
    }

    this.value = new DateRange(startDate, endDate);
  }
}
