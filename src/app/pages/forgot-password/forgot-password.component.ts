import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { ForgotPasswordParams } from 'src/app/domain/repositories/password-reset-repository';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    LoadingButtonComponent,
    LocalizationMenuComponent,
  ],
})
export class ForgotPasswordComponent extends BaseComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  isLoading: boolean = false;

  passwordResetRepository = inject(PASSWORD_RESET_REPOSITORY);

  get email() {
    return this.forgotPasswordForm.get('email') as FormControl;
  }

  constructor() {
    super();
  }

  onForgotPasswordSubmitted(): void {
    this.isLoading = true;
    const params: ForgotPasswordParams = {
      email: this.forgotPasswordForm.value.email ?? '',
    };
    this.passwordResetRepository.forgotPassword(params).subscribe({
      next: () => {
        this.snackBarService.showSuccess(
          'Password reset link sent to your email',
        );
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBarService.showError(`Failed to send: ${error}`);
        this.isLoading = false;
      },
    });
  }
}
