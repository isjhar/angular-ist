import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { DefaultCurrencyPipe } from '../text/default-currency.pipe';

@Directive({
  selector: 'input[appCurrencyInput]',
  host: {
    '[style.text-align]': '"right"',
  },
  providers: [
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: CurrencyInputDirective },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputDirective),
      multi: true,
    },
  ],
})
export class CurrencyInputDirective {
  private _value!: number | null;
  defaultCurrencyPipe = new DefaultCurrencyPipe();

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
    this._onChange(this._value); // here to notify Angular Validators
    if (this._value !== null) {
      this.formatValue(this._value);
      this.setCursorPosition();
    }
  }

  @HostListener('focus')
  onFocus() {
    this.setCursorPosition();
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

  _onChange(value: any): void {}

  registerOnTouched() {}

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
