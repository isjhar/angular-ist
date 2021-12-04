import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const passwordValidator2: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  let formControl = control as FormControl;
  if (formControl.value.length < 2) {
    return null;
  }
  return {
    passwordMismatch: true,
  };
};

@Component({
  selector: 'app-tambah-pengguna-dialog',
  templateUrl: './tambah-pengguna-dialog.component.html',
  styleUrls: ['./tambah-pengguna-dialog.component.scss'],
})
export class TambahPenggunaDialogComponent implements OnInit {
  currentPassword: string = '';

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required,
      (control: AbstractControl) => {
        console.log(this.currentPassword);
        let confirmPassword = control as FormControl;
        if (confirmPassword.value === this.currentPassword) {
          return null;
        }
        return {
          passwordMismatch: true,
        };
      },
    ]),
  });

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get email() {
    return this.formGroup.get('email') as FormControl;
  }

  get password() {
    return this.formGroup.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword') as FormControl;
  }

  constructor() {}

  ngOnInit(): void {
    this.password.valueChanges.subscribe((value) => {
      this.currentPassword = value;
    });
  }

  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let confirmPassword = control as FormControl;
      if (confirmPassword.value.lengt < 2) {
        return null;
      }
      return {
        passwordMismatch: true,
      };
    };
  }

  onSubmitted(): void {
    console.log('test');
  }

  getErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'Kolom harus diisi';
    }

    if (this.email.hasError('required')) {
      return 'Kolom harus diisi';
    } else if (this.email.hasError('email')) {
      return 'Email tidak valid';
    }
    return '';
  }
}
