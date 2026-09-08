import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { PASSWORD_RESET_REPOSITORY } from 'src/app/app-token-repository';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatInput,
} from '@angular/material/input';
import { LoadingButtonComponent } from '../shared/default-form/loading-button/loading-button.component';
import { BaseComponent } from 'src/app/pages/shared/base.component';
import { LocalizationMenuComponent } from '../shared/localization-menu/localization-menu.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CustomValidator } from 'src/app/pages/shared/default-form/custom-validator';
import { FormErrorPasswordComponent } from 'src/app/pages/shared/default-form/form-error/form-error-password/form-error-password.component';
import { FormErrorRequiredComponent } from 'src/app/pages/shared/default-form/form-error/form-error-required/form-error-required.component';
import { TogglePasswordDirective } from 'src/app/pages/shared/default-form/toggle-password.directive';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ResetPasswordParams } from 'src/app/domain/repositories/password-reset-repository';
import { SubmissionComponent } from 'src/app/pages/shared/submission-component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    LoadingButtonComponent,
    LocalizationMenuComponent,
    FormErrorPasswordComponent,
    FormErrorRequiredComponent,
    TogglePasswordDirective,
    MatIcon,
    MatButtonModule,
    FooterComponent,
  ],
})
export class ResetPasswordComponent
  extends SubmissionComponent
  implements OnInit, OnDestroy
{
  resetPasswordForm = new FormGroup({
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
  currentPassword: string = '';
  confirmPasswordSubscription?: Subscription;

  passwordResetRepository = inject(PASSWORD_RESET_REPOSITORY);
  route = inject(ActivatedRoute);
  router = inject(Router);

  get password() {
    return this.resetPasswordForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword') as FormControl;
  }

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.password.valueChanges.subscribe((value) => {
      this.currentPassword = value;
    });

    this.confirmPasswordSubscription = this.password.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe(() => {
        this.confirmPassword.updateValueAndValidity();
      });
  }

  override ngOnDestroy(): void {
    this.confirmPasswordSubscription?.unsubscribe();
  }

  onResetPasswordSubmitted(): void {
    this.isLoading = true;
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';
    const email = this.route.snapshot.queryParamMap.get('email') ?? '';
    const params: ResetPasswordParams = {
      token: token,
      email: email,
      password: this.resetPasswordForm.value.password ?? '',
    };
    this.passwordResetRepository.resetPassword(params).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBarService.showSuccess(
          $localize`:passwordResetSuccess:Password reset success`,
        );
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.snackBarService.showError(`Failed to reset: ${error}`);
        this.isLoading = false;
      },
    });
  }
}
