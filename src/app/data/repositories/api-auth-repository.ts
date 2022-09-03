import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/domain/entities/user';
import {
  AuthRepository,
  LoginParams,
} from 'src/app/domain/repositories/auth-repository';
import { ApiResponse } from '../entities/api-response';

export class ApiAuthRepository implements AuthRepository {
  constructor(private http: HttpClient) {}
  getCsrfToken(): Observable<any> {
    return this.http.get('/sanctum/csrf-cookie');
  }
  login(data: LoginParams): Observable<any> {
    let headers = new HttpHeaders({
      Accept: 'text/html',
    });
    return this.http.post('/auth/login', data, {
      headers: headers,
      withCredentials: true,
      responseType: 'text',
      observe: 'response',
    });
  }
  getLoggedInUser(): Observable<User> {
    return this.http
      .get<ApiResponse<User>>('/api/user')
      .pipe(map<ApiResponse<User>, User>((x) => x.data));
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
