import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { USER_REPOSITORY } from 'src/app/app-token-repository';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import { CustomValidator } from 'src/app/pages/shared/default-form/custom-validator';
import { FormErrorPasswordComponent } from 'src/app/pages/shared/default-form/form-error/form-error-password/form-error-password.component';
import { FormErrorRequiredComponent } from 'src/app/pages/shared/default-form/form-error/form-error-required/form-error-required.component';
import { LoadingButtonComponent } from 'src/app/pages/shared/default-form/loading-button/loading-button.component';
import { TogglePasswordDirective } from 'src/app/pages/shared/default-form/toggle-password.directive';
import { FormDialogComponent } from 'src/app/pages/shared/form-dialog-component';

export interface ChangePasswordDialogData {
  value: {
    id: number;
  };
}

@Component({
  selector: 'app-change-password-dialog',
  imports: [
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    FormErrorRequiredComponent,
    LoadingButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    FormErrorPasswordComponent,
    TogglePasswordDirective,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss',
})
export class ChangePasswordDialogComponent
  extends FormDialogComponent
  implements OnInit, OnDestroy
{
  currentPassword: string = '';
  formGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      CustomValidator.password,
    ]),
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
  });

  get password() {
    return this.formGroup.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword') as FormControl;
  }

  passwordSubscription?: Subscription;

  constructor(
    dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangePasswordDialogData,
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
  ) {
    super(dialogRef);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.passwordSubscription = this.password.valueChanges.subscribe(
      (value) => {
        this.currentPassword = value;
      },
    );
  }

  override ngOnDestroy(): void {
    this.passwordSubscription?.unsubscribe();
    super.ngOnDestroy();
  }

  onSubmitted(): void {
    this.userRepository
      .changePassword({
        id: this.data.value.id,
        password: this.password.value,
      })
      .subscribe({
        next: (response) => {
          this.onSucceeded();
        },
        error: (error) => {
          this.onError(error);
        },
      });
  }
}
