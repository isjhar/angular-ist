import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
  static timeFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let input: string = control.value;
      let found = input.match(/(2[0-3]|[0-1][0-9]):([0-5][0-9])/g);
      return !found || found.length == 0
        ? { timeFormat: { value: control.value } }
        : null;
    };
  }
}
