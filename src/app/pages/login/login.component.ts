import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AUTH_REPOSITORY } from 'src/app/app-token-repository.module';
import { AuthRepository } from 'src/app/domain/repositories/auth-repository';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { LoginUseCase } from 'src/app/domain/use-cases/login-use-case';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app-local-repository.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  error?: string;
  isLoading: boolean = false;

  loginUseCase: LoginUseCase;

  constructor(
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository,
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    private router: Router
  ) {
    this.loginUseCase = new LoginUseCase(
      authenticatedUserRepository,
      authRepository
    );
  }

  ngOnInit(): void {}

  onLoginformSubmitted(): void {
    this.isLoading = true;
    this.loginUseCase.execute(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['']);
      },
      (error) => {
        this.error = `Login failed: ${error}`;
        this.isLoading = false;
      }
    );
  }
}
