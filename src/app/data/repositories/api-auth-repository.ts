import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { User } from 'src/app/domain/entities/user';
import {
  AuthRepository,
  LoginParams,
} from 'src/app/domain/repositories/auth-repository';
import { ApiResponse } from '../entities/api-response';
import { mapUserData, UserData } from '../entities/user-data';

@Injectable()
export class ApiAuthRepository implements AuthRepository {
  constructor(private http: HttpClient) {}
  getCsrfToken(): Observable<any> {
    return this.http.get('/sanctum/csrf-cookie');
  }
  login(data: LoginParams): Observable<User> {
    let headers = new HttpHeaders({
      Accept: 'text/html',
    });
    return this.getCsrfToken().pipe(
      concatMap((response) =>
        this.http
          .post('/auth/login', data, {
            headers: headers,
            withCredentials: true,
            responseType: 'text',
            observe: 'response',
          })
          .pipe(
            concatMap((response) =>
              this.http.get<ApiResponse<UserData>>('/api/user').pipe(
                map<ApiResponse<UserData>, User>((x) => {
                  return mapUserData(x.data);
                })
              )
            )
          )
      )
    );
  }

  logout(): Observable<any> {
    let headers = new HttpHeaders({
      Accept: 'text/html',
    });
    return this.http.post('/auth/logout', null, {
      headers: headers,
      responseType: 'text',
      observe: 'response',
    });
  }
}
