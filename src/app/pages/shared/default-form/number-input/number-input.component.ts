import {
  booleanAttribute,
  Component,
  effect,
  ElementRef,
  HostBinding,
  input,
  OnDestroy,
  Optional,
  Self,
  signal,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NgControl,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-number-input',
  standalone: true,
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  providers: [
    { provide: MatFormFieldControl, useExisting: NumberInputComponent },
  ],
  imports: [
    MatInputModule,
    NgxMaskDirective,
    ɵInternalFormsSharedModule,
    FormsModule,
  ],
  host: {
    '[class.number-input-floating]': 'shouldLabelFloat',
    '(focusin)': 'onFocusIn($event)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class NumberInputComponent
  implements MatFormFieldControl<number | null>, ControlValueAccessor, OnDestroy
{
  static nextId = 0;

  numberInput = viewChild.required<ElementRef<HTMLInputElement>>('numberInput');

  @HostBinding() id = `app-number-input-${NumberInputComponent.nextId++}`;

  _placeholderInput = input('', { alias: 'placeholder' });
  _requiredInput = input(false, {
    transform: booleanAttribute,
    alias: 'required',
  });
  _disabledInput = input(false, {
    transform: booleanAttribute,
    alias: 'disabled',
  });
  mask = input('separator.0');

  private _disabledInternal = signal(false);

  private _ngControl: NgControl | null = null;

  get ngControl(): NgControl | null {
    return this._ngControl;
  }

  private _value: number | null = null;

  get value(): number | null {
    return this._value;
  }
  set value(val: number | null) {
    this._value = val;
    this.stateChanges.next();
  }

  focused = false;
  touched = false;

  stateChanges = new Subject<void>();
  controlType = 'app-number-input';

  formControl = new FormControl();

  onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  get placeholder(): string {
    return this._placeholderInput();
  }

  get required(): boolean {
    return this._requiredInput();
  }

  get disabled(): boolean {
    return this._disabledInternal();
  }

  constructor(
    @Optional() @Self() ngControl: NgControl,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
    if (ngControl != null) {
      this._ngControl = ngControl;
      this._ngControl.valueAccessor = this;
    }

    effect(() => {
      this._placeholderInput();
      this._requiredInput();
      this._disabledInternal.set(this._disabledInput());
      this.stateChanges.next();
    });
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  get empty(): boolean {
    return this._value == null;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  get errorState(): boolean {
    return (this._ngControl?.invalid ?? false) && this.touched;
  }

  setDescribedByIds(ids: string[]): void {
    const el = this._elementRef.nativeElement;
    const container = el.querySelector(
      '.number-input-container',
    ) as HTMLElement | null;
    if (container) {
      container.setAttribute('aria-describedby', ids.join(' '));
    }
  }

  onContainerClick(_event: MouseEvent): void {
    this.numberInput().nativeElement.focus();
  }

  onFocusIn(_event: FocusEvent): void {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent): void {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value;
    if (rawValue === '' || rawValue === '-') {
      this._value = null;
    } else {
      this._value = this.parseIndonesianDecimal(rawValue);
    }
    this.onChange(this._value);
  }

  parseIndonesianDecimal(valueStr: string): number {
    // 1. Remove all thousands dots
    // 2. Replace the decimal comma with a standard period
    const standardizedStr = valueStr.replace(/\./g, '').replace(',', '.');

    const result = parseFloat(standardizedStr);
    return result;
  }

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledInternal.set(isDisabled);
    this.stateChanges.next();
  }
}
