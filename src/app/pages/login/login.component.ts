import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import {
  AUTHENTICATED_USER_REPOSITORY,
  AUTH_REPOSITORY,
} from 'src/app/app.module';
import { AuthRepository } from 'src/app/domain/repositories/auth-repository';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { LoginUseCaseService } from 'src/app/domain/use-cases/login-use-case.service';

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
  error?: String;

  loginUseCaseService: LoginUseCaseService;

  constructor(
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository,
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    private router: Router
  ) {
    this.loginUseCaseService = new LoginUseCaseService(
      authenticatedUserRepository,
      authRepository
    );
  }

  ngOnInit(): void {}

  onLoginformSubmitted(): void {
    this.loginUseCaseService.execute(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['']);
      },
      (error) => {
        this.error = `Login failed: ${error}`;
      }
    );
  }
}
