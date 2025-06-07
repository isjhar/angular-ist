import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// TODO: import { MAT_LEGACY_INPUT_VALUE_ACCESSOR as MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/legacy-input'; disable for upgrade
import { DefaultCurrencyPipe } from '../text/default-currency.pipe';

@Directive({
    selector: 'input[appCurrencyInput]',
    host: {
        '[style.text-align]': '"right"',
    },
    providers: [
        // TODO: { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: CurrencyInputDirective }, disable for upgrade
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CurrencyInputDirective),
            multi: true,
        },
    ],
    standalone: false
})
export class CurrencyInputDirective {
  private _value!: number | null;
  defaultCurrencyPipe = new DefaultCurrencyPipe();

  _onChange: (value: any) => void = (value: any) => {};
  _onTouch: () => void = () => {};

  get value(): number | null {
    if (this._value == null) {
      return null;
    }
    return Number(this._value);
  }

  @Input('value')
  set value(value: number | null) {
    this._value = value;
    this.formatValue(this._value);
  }

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    let parsedValue = value.replace(/[^\d]/g, '');
    this._value = null;
    if (parsedValue != '') {
      this._value = Number(parsedValue);
    }
    if (this._value !== null) {
      this.formatValue(this._value);
      this.setCursorPosition();
    }
    this._onChange(this._value); // here to notify Angular Validators
  }

  @HostListener('focus')
  onFocus() {
    this.setCursorPosition();
  }

  @HostListener('blur')
  onBlur() {
    this._onChange(this._value);
    this._onTouch();
  }

  setCursorPosition() {
    let value = this.elementRef.nativeElement.value;
    if (value !== null) {
      this.elementRef.nativeElement.setSelectionRange(
        value.length,
        value.length
      );
    }
  }

  writeValue(value: any) {
    if (typeof value === 'string') {
      if (value !== '') {
        this._value = Number(value);
        this.formatValue(this._value); // format Value
        return;
      }
      this._value = null;
      this.formatValue(this._value); // format Value
      return;
    }

    this._value = value;
    this.formatValue(this._value); // format Value
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this._onTouch = fn;
  }

  formatValue(value: number | null) {
    if (value !== null) {
      this.elementRef.nativeElement.value = this.defaultCurrencyPipe.transform(
        value.toString()
      )!; // number
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }
}
