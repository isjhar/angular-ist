import { Inject, Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app-local-repository';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { AUTH_REPOSITORY } from 'src/app/app-token-repository';
import { AuthRepository } from 'src/app/domain/repositories/auth-repository';
import { LogoutUseCase } from 'src/app/domain/use-cases/logout-use-case';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  logoutUseCase: LogoutUseCase;

  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository,
    private router: Router,
  ) {
    this.logoutUseCase = new LogoutUseCase(
      authenticatedUserRepository,
      authRepository,
    );
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({
      url: `${environment.apiUrl}${request.url}`,
    });
    return next
      .handle(apiReq)
      .pipe(catchError((x) => this.throwMessageError(x)));
  }

  throwMessageError(err: HttpErrorResponse): Observable<never> {
    if (err.status === 401) {
      this.logoutUseCase.execute().subscribe((response) => {
        this.router.navigate(['/login']);
      });
    }
    let error = err.error;

    let message = 'internal server error';

    if (error && typeof error === 'string') {
      const contentType = err.headers.get('Content-Type');
      const isJson = contentType?.includes('application/json');
      if (isJson) {
        message = JSON.parse(error).message;
      }
    } else if (error) {
      message = error.message;
    }
    return throwError(() => message);
  }
}

export const apiInterceptorProviders: Provider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true,
  },
];
