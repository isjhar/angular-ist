import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LogoutUseCase } from './domain/use-cases/logout-use-case';
import { AuthenticatedUserRepository } from './domain/repositories/authenticated-user-repository';
import { AuthRepository } from './domain/repositories/auth-repository';
import { AUTHENTICATED_USER_REPOSITORY } from './app-local-repository.module';
import { AUTH_REPOSITORY } from './app-token-repository.module';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  logoutUseCase: LogoutUseCase;
  constructor(
    private router: Router,
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository
  ) {
    this.logoutUseCase = new LogoutUseCase(
      authenticatedUserRepository,
      authRepository
    );
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((x) => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (this.router.url !== '/login') {
      if (err.status === 401 || err.status === 419) {
        this.logoutUseCase.execute().subscribe((response) => {
          this.router.navigateByUrl(`/login`);
        });
        return EMPTY;
      } else if (err.status == 403) {
        this.router.navigateByUrl('');
        return EMPTY;
      }

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return this.throwMessageError(err);
    }
    return this.throwMessageError(err);
  }

  throwMessageError(err: HttpErrorResponse): Observable<never> {
    let error = err.error;
    let message = 'internal server error';
    if (error && typeof error === 'string') {
      message = JSON.parse(error).message;
    } else if (error) {
      message = error.message;
    }
    return throwError(() => message);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
