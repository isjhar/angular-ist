import { Component, Inject, OnInit } from '@angular/core';
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
} from '@angular/material/input';
import { LoadingButtonComponent } from '../shared/default-form/loading-button/loading-button.component';
import { FormErrorRequiredComponent } from '../shared/default-form/form-error/form-error-required/form-error-required.component';
import { MatButton } from '@angular/material/button';

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
    LoadingButtonComponent,
    FormErrorRequiredComponent,
  ],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  error?: string;
  isLoading: boolean = false;

  loginUseCase: LoginUseCase;

  constructor(
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository,
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    private router: Router,
  ) {
    this.loginUseCase = new LoginUseCase(
      authenticatedUserRepository,
      authRepository,
    );
  }

  ngOnInit(): void {}

  onLoginformSubmitted(): void {
    this.isLoading = true;
    this.loginUseCase
      .execute({
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      })
      .subscribe(
        (response) => {
          this.router.navigate(['']);
        },
        (error) => {
          this.error = `Login failed: ${error}`;
          this.isLoading = false;
        },
      );
  }

  loginDemoClicked(): void {
    this.loginForm.patchValue({
      email: 'demo@gmail.com',
      password: '1234',
    });
    this.onLoginformSubmitted();
  }
}
