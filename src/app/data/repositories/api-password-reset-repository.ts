import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import {
  ForgotPasswordParams,
  PasswordResetRepository,
  ResetPasswordParams,
} from 'src/app/domain/repositories/password-reset-repository';
import { ApiResponse } from '../entities/api-response';

@Injectable()
export class ApiPasswordResetRepository implements PasswordResetRepository {
  constructor(private http: HttpClient) {}

  forgotPassword(data: ForgotPasswordParams): Observable<any> {
    let headers = new HttpHeaders({
      Accept: 'application/json',
    });
    return this.http
      .post<ApiResponse<any>>('/api/forgot-password', data, {
        headers: headers,
      })
      .pipe(map((response) => response));
  }

  resetPassword(data: ResetPasswordParams): Observable<any> {
    let headers = new HttpHeaders({
      Accept: 'application/json',
    });
    return this.http.get('/sanctum/csrf-cookie').pipe(
      concatMap((response) =>
        this.http
          .post('/api/reset-password', data, {
            headers: headers,
            withCredentials: true,
            responseType: 'json',
            observe: 'response',
          })
          .pipe(map((response) => response)),
      ),
    );
  }
}
