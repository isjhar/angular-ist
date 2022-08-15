import { Injectable } from '@angular/core';
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
import { LogoutUseCaseService } from './domain/use-cases/logout-use-case.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private logoutUseCaseService: LogoutUseCaseService
  ) {}

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
        this.logoutUseCaseService.execute().subscribe((response) => {
          this.router.navigateByUrl(`/login`);
        });
        return EMPTY;
      } else if (err.status == 403) {
        this.router.navigateByUrl('');
        return EMPTY;
      }

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return throwError(
        err.error.message ? err.error.message : 'internal server error'
      );
    }
    return throwError(
      err.error.message ? err.error.message : 'internal server error'
    );
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
