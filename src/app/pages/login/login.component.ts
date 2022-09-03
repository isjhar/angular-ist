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
import { GetCsrfTokenUseCaseService } from 'src/app/domain/use-cases/get-csrf-token-use-case.service';
import {
  GetLoggedInUserUseCaseResponse,
  GetLoggedInUserUseCaseService,
} from 'src/app/domain/use-cases/get-logged-in-user-use-case.service';
import { LoginUseCaseService } from 'src/app/domain/use-cases/login-use-case.service';
import {
  StoreAuthenticatedUserUseCaseParams,
  StoreAuthenticatedUserUseCaseService,
} from 'src/app/domain/use-cases/store-authenticated-user-use-case.service';

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

  getCsrfTokenUseCaseService: GetCsrfTokenUseCaseService;
  getLoggedUserUseCaseService: GetLoggedInUserUseCaseService;
  storeAuthenticatedUserUseCaseService: StoreAuthenticatedUserUseCaseService;
  loginUseCaseService: LoginUseCaseService;

  constructor(
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository,
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    private router: Router
  ) {
    this.loginUseCaseService = new LoginUseCaseService(authRepository);
    this.getCsrfTokenUseCaseService = new GetCsrfTokenUseCaseService(
      authRepository
    );
    this.getLoggedUserUseCaseService = new GetLoggedInUserUseCaseService(
      authRepository
    );
    this.storeAuthenticatedUserUseCaseService =
      new StoreAuthenticatedUserUseCaseService(authenticatedUserRepository);
  }

  ngOnInit(): void {}

  onLoginformSubmitted(): void {
    this.getCsrfTokenUseCaseService
      .execute()
      .pipe(
        concatMap((response) =>
          this.loginUseCaseService.execute(this.loginForm.value)
        ),
        concatMap((response) =>
          this.getLoggedUserUseCaseService.execute().pipe(
            map<
              GetLoggedInUserUseCaseResponse,
              StoreAuthenticatedUserUseCaseParams
            >((response) => {
              return {
                loggedInUser: response.loggedInUser,
              };
            })
          )
        ),
        concatMap((response) =>
          this.storeAuthenticatedUserUseCaseService.execute(response)
        )
      )
      .subscribe(
        (response) => {
          this.router.navigate(['']);
        },
        (error) => {
          this.error = `Login failed: ${error}`;
        }
      );
  }
}
