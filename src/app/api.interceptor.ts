import { Injectable, Provider } from '@angular/core';
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

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

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
