import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
  static timeFormat(control: AbstractControl): ValidationErrors | null {
    let input: string = control.value;
    if (!input) return null;
    let found = input.match(/^(2[0-3]|[0-1][0-9]):([0-5][0-9])$/g);
    return !found || found.length == 0
      ? { timeFormat: { value: control.value } }
      : null;
  }

  static notFoundOption(control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    return value && !value.id
      ? { notFoundOption: { value: control.value } }
      : null;
  }

  static greaterThan(threshold: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;
      return (value != undefined || value != null) && value <= threshold
        ? { greaterThan: { value: control.value, threshold: threshold } }
        : null;
    };
  }
}
