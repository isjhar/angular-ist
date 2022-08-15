import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
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

  constructor(
    private getCsrfTokenUseCaseService: GetCsrfTokenUseCaseService,
    private getLoggedUserUseCaseService: GetLoggedInUserUseCaseService,
    private loginUseCaseService: LoginUseCaseService,
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
