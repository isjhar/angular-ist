import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AUTH_REPOSITORY } from 'src/app/app-token-repository';
import { AuthRepository } from 'src/app/domain/repositories/auth-repository';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { LoginUseCase } from 'src/app/domain/use-cases/login-use-case';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app-local-repository';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatInput,
  MatSuffix,
} from '@angular/material/input';
import { LoadingButtonComponent } from '../shared/default-form/loading-button/loading-button.component';
import { FormErrorRequiredComponent } from '../shared/default-form/form-error/form-error-required/form-error-required.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { BaseComponent } from 'src/app/pages/shared/base.component';
import { MatIcon } from '@angular/material/icon';
import { TogglePasswordDirective } from 'src/app/pages/shared/default-form/toggle-password.directive';
import { LocalizationMenuComponent } from '../shared/localization-menu/localization-menu.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatIcon,
    MatIconButton,
    MatSuffix,
    LoadingButtonComponent,
    FormErrorRequiredComponent,
    TogglePasswordDirective,
    LocalizationMenuComponent,
  ],
})
export class LoginComponent extends BaseComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  isLoading: boolean = false;

  loginUseCase: LoginUseCase;

  constructor(
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository,
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    private router: Router,
  ) {
    super();
    this.loginUseCase = new LoginUseCase(
      authenticatedUserRepository,
      authRepository,
    );
  }

  onLoginformSubmitted(): void {
    this.isLoading = true;
    this.loginUseCase
      .execute({
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      })
      .subscribe({
        next: (response) => {
          this.router.navigate(['']);
        },
        error: (error) => {
          this.snackBarService.showError(`Login failed: ${error}`);
          this.isLoading = false;
        },
      });
  }

  loginDemoClicked(): void {
    this.loginForm.patchValue({
      email: 'demo@gmail.com',
      password: '1234',
    });
    this.onLoginformSubmitted();
  }
}
