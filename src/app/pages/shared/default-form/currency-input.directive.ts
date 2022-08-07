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
  private _value!: string | null;
  defaultCurrencyPipe = new DefaultCurrencyPipe();

  get value(): string | null {
    return this._value;
  }

  @Input('value')
  set value(value: string | null) {
    this._value = value;
    this.formatValue(value);
  }

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this._value = value.replace(/[^\d]/g, '');
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
    this._value = value;
    this.formatValue(this._value); // format Value
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  _onChange(value: any): void {}

  registerOnTouched() {}

  formatValue(value: string | null) {
    if (value !== null) {
      this.elementRef.nativeElement.value =
        this.defaultCurrencyPipe.transform(value)!; // number
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }
}
