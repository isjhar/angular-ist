import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

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

  static atLeastContainsOneUpperCase(
    control: AbstractControl,
  ): ValidationErrors | null {
    const value = control.value;
    let found = value.match(/[A-Z]/g);
    return !found || found.length == 0
      ? { atLeastContainsOneUpperCase: { value: control.value } }
      : null;
  }

  static atLeastContainsOneLowerCase(
    control: AbstractControl,
  ): ValidationErrors | null {
    const value = control.value;
    let found = value.match(/[a-z]/g);
    return !found || found.length == 0
      ? { atLeastContainsOneLowerCase: { value: control.value } }
      : null;
  }

  static atLeastContainsOneNumber(
    control: AbstractControl,
  ): ValidationErrors | null {
    const value = control.value;
    let found = value.match(/[0-9]/g);
    return !found || found.length == 0
      ? { atLeastContainsOneNumber: { value: control.value } }
      : null;
  }

  static password(control: AbstractControl): ValidationErrors | null {
    const minLength = Validators.minLength(8)(control);
    if (minLength) {
      return minLength;
    }
    const atLeastContainsOneUpperCase =
      CustomValidator.atLeastContainsOneUpperCase(control);
    if (atLeastContainsOneUpperCase) {
      return atLeastContainsOneUpperCase;
    }
    const atLeastContainsOneLowerCase =
      CustomValidator.atLeastContainsOneLowerCase(control);
    if (atLeastContainsOneLowerCase) {
      return atLeastContainsOneLowerCase;
    }
    const atLeastContainsOneNumber =
      CustomValidator.atLeastContainsOneNumber(control);
    if (atLeastContainsOneNumber) {
      return atLeastContainsOneNumber;
    }

    return null;
  }
}
