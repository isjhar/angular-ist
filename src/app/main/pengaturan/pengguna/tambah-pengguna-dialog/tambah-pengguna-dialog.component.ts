import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../user.service';

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
  @Output() success = new EventEmitter();

  currentPassword: string = '';
  roleOptions: any[] = [];
  isLoading: boolean = false;
  error: string = '';

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required,
      (control: AbstractControl) => {
        let confirmPassword = control as FormControl;
        if (confirmPassword.value === this.currentPassword) {
          return null;
        }
        return {
          passwordMismatch: true,
        };
      },
    ]),
    roles: new FormControl([]),
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

  get roles() {
    return this.formGroup.get('roles') as FormControl;
  }

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<TambahPenggunaDialogComponent>
  ) {}

  ngOnInit(): void {
    this.password.valueChanges.subscribe((value) => {
      this.currentPassword = value;
    });
    this.getRoles();
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
    this.isLoading = true;
    let roles = this.roles.value as any[];
    this.userService
      .storeUser({
        email: this.email.value,
        name: this.name.value,
        password: this.password.value,
        roles: roles.map((x) => x.id),
      })
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.dialogRef.close('success');
        },
        (response) => {
          this.isLoading = false;
          this.error = response.error.message
            ? response.error.message
            : 'internal server error';
        }
      );
  }

  addRole(event: MatChipInputEvent): void {}

  removeRole(role: any): void {
    const roles = this.roles.value as any[];
    let index = roles.findIndex((x) => x.id == role.id);
    roles.splice(index, 1);
    this.roles.setValue(roles);
  }

  selectedRole(event: any): void {}

  getRoles(): void {
    this.userService.getRoles().subscribe((response) => {
      this.roleOptions = response.data;
    });
  }
}
