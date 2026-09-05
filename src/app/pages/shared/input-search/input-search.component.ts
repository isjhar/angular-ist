import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-input-search',
  imports: [
    MatFormField,
    MatLabel,
    MatIcon,
    MatSuffix,
    ReactiveFormsModule,
    MatInput,
    FormsModule,
  ],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputSearchComponent,
    },
  ],
})
export class InputSearchComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() placeholder: string = '';
  @Input() set enableDebounce(value: boolean) {
    this.searchValueChangesSubscription?.unsubscribe();
    if (value) {
      this.searchValueChangesSubscription = this._inputSubject
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          this.onChange(value);
        });
    } else {
      this.searchValueChangesSubscription = this._inputSubject.subscribe(
        (value) => {
          this.onChange(value);
        },
      );
    }
  }

  value: string | null = null;
  private _inputSubject = new Subject<string | null>();

  searchValueChangesSubscription?: Subscription;

  onChange = (value: string | null) => {};
  onTouched = () => {};

  disabled = false;
  touched = false;

  ngOnInit(): void {
    this.searchValueChangesSubscription = this._inputSubject.subscribe(
      (value) => {
        this.onChange(value);
      },
    );
  }

  ngOnDestroy(): void {
    this.searchValueChangesSubscription?.unsubscribe();
  }

  writeValue(value: string | null): void {
    this.value = value;
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

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onInputChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this._inputSubject.next(val); // Push value into the "filter"
  }
}
