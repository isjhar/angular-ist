import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import {
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
  ],
  templateUrl: './date-range-filter.component.html',
  styleUrl: './date-range-filter.component.scss',
})
export class DateRangeFilterComponent implements OnInit, OnDestroy {
  @Output() change = new EventEmitter<DateRangeFilter>();

  filterOption = new FormControl<DateFilterOption>('today');
  startDate = new FormControl<Date | null>(new Date());
  endDate = new FormControl<Date | null>(new Date());

  filterOptionSubscription?: Subscription;
  startDateSubscription?: Subscription;
  endDateSubscription?: Subscription;

  ngOnInit(): void {
    this.filterOptionSubscription = this.filterOption.valueChanges.subscribe(
      (value) => {
        this.updateDateRange();
      },
    );
    this.startDateSubscription = this.startDate.valueChanges.subscribe(
      (value) => {
        this.updateQuickRange();
      },
    );
    this.endDateSubscription = this.endDate.valueChanges.subscribe((value) => {
      this.updateQuickRange();
    });
  }

  ngOnDestroy(): void {
    this.filterOptionSubscription?.unsubscribe();
    this.startDateSubscription?.unsubscribe();
    this.endDateSubscription?.unsubscribe();
  }

  updateDateRange(): void {
    const filterOption = this.filterOption.value;

    switch (filterOption) {
      case 'today':
        this.startDate.patchValue(new Date(), { emitEvent: false });
        this.endDate.patchValue(new Date(), { emitEvent: false });
        break;
      case 'yesterday':
        this.startDate.patchValue(getYesterdayDate(), { emitEvent: false });
        this.endDate.patchValue(getYesterdayDate(), { emitEvent: false });
        break;
    }

    this.onChanged();
  }

  updateQuickRange(): void {
    const startDate = this.startDate.value;
    const endDate = this.endDate.value;
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

    this.filterOption.setValue(quickRange, { emitEvent: false });

    this.onChanged();
  }

  onChanged(): void {
    const startDate = this.startDate.value;
    if (startDate) {
      startDate.setHours(0, 0, 0, 0);
    }

    const endDate = this.endDate.value;
    if (endDate) {
      endDate.setHours(23, 59, 59, 999);
    }
    this.change.emit({
      startDate: startDate,
      endDate: endDate,
    });
  }
}
