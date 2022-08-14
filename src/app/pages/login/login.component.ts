import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { GetCsrfTokenUsecaseService } from 'src/app/domain/usecases/get-csrf-token-usecase.service';
import {
  GetLoggedInUserUseCaseResponse,
  GetLoggedInUserUseCaseService,
} from 'src/app/domain/usecases/get-logged-in-user-use-case.service';
import { LoginUsecaseService } from 'src/app/domain/usecases/login-usecase.service';
import {
  StoreAuthenticatedUserUseCaseParams,
  StoreAuthenticatedUserUseCaseService,
} from 'src/app/domain/usecases/store-authenticated-user-use-case.service';

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

  constructor(
    private getCsrfTokenUseCaseService: GetCsrfTokenUsecaseService,
    private getLoggedUserUseCaseService: GetLoggedInUserUseCaseService,
    private loginUseCaseService: LoginUsecaseService,
    private storeAuthenticatedUserUseCaseService: StoreAuthenticatedUserUseCaseService,
    private router: Router
  ) {}

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
