import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  getLast30DaysDate,
  getLast7DaysDate,
  isSameDate,
} from 'src/app/pages/shared/utils/date.utils';
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate,
} from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { SelectOption } from 'src/app/pages/shared/view-models/select-option.view-model';

@Component({
  selector: 'app-filter',
  imports: [
    ReactiveFormsModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatHint,
    MatDatepickerToggle,
    MatStartDate,
    MatEndDate,
    MatButton,
    MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);

  quickRanges: SelectOption<number>[] = [
    {
      label: 'Today',
      value: QuickRange.Today,
    },
    {
      label: 'Last 7 Days',
      value: QuickRange.Last7Days,
    },
    {
      label: 'Last 30 Days',
      value: QuickRange.Last30Days,
    },
    {
      label: 'Custom',
      value: QuickRange.Custom,
    },
  ];

  formGroup = this.formBuilder.group({
    startDate: [getLast7DaysDate()],
    endDate: [new Date()],
    quickRange: [QuickRange.Last7Days],
  });

  quickRangeValueChangedSubscription?: Subscription;
  startDateValueChangedSubscription?: Subscription;
  endDateValueChangedSubscription?: Subscription;

  get quickRange() {
    return this.formGroup.get('quickRange') as FormControl;
  }

  get startDate() {
    return this.formGroup.get('startDate') as FormControl;
  }

  get endDate() {
    return this.formGroup.get('endDate') as FormControl;
  }

  ngOnInit(): void {
    this.quickRangeValueChangedSubscription =
      this.quickRange.valueChanges.subscribe((value) => {
        this.updateDateRange();
      });

    this.startDateValueChangedSubscription =
      this.startDate.valueChanges.subscribe((value) => {
        this.updateQuickRange();
      });

    this.endDateValueChangedSubscription = this.endDate.valueChanges.subscribe(
      (value) => {
        this.updateQuickRange();
      },
    );
  }

  ngOnDestroy(): void {
    this.quickRangeValueChangedSubscription?.unsubscribe();
    this.startDateValueChangedSubscription?.unsubscribe();
    this.endDateValueChangedSubscription?.unsubscribe();
  }

  updateDateRange(): void {
    const quickRange = this.quickRange.value;

    switch (quickRange) {
      case QuickRange.Today:
        this.formGroup.patchValue(
          {
            startDate: new Date(),
            endDate: new Date(),
          },
          {
            emitEvent: false,
          },
        );
        break;
      case QuickRange.Last7Days:
        this.formGroup.patchValue(
          {
            startDate: getLast7DaysDate(),
            endDate: new Date(),
          },
          {
            emitEvent: false,
          },
        );
        break;
      case QuickRange.Last30Days:
        this.formGroup.patchValue(
          {
            startDate: getLast30DaysDate(),
            endDate: new Date(),
          },
          {
            emitEvent: false,
          },
        );
        break;
    }
  }

  updateQuickRange(): void {
    const startDate = this.startDate.value;
    const endDate = this.endDate.value;
    const today = new Date();
    const last7Days = getLast7DaysDate();
    const last30Days = getLast30DaysDate();

    let quickRange = QuickRange.Custom;

    if (isSameDate(endDate, today)) {
      if (isSameDate(startDate, today)) {
        quickRange = QuickRange.Today;
      } else if (isSameDate(startDate, last7Days)) {
        quickRange = QuickRange.Last7Days;
      } else if (isSameDate(startDate, last30Days)) {
        quickRange = QuickRange.Last30Days;
      }
    }

    this.quickRange.setValue(quickRange, { emitEvent: false });
  }

  onSubmit(): void {}
}

enum QuickRange {
  Today,
  Last7Days,
  Last30Days,
  Custom,
}
