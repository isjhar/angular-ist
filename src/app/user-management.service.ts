import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor(private http: HttpClient) {}

  getCsrfToken(): Observable<any> {
    return this.http.get('/sanctum/csrf-cookie');
  }

  login(data: any): Observable<any> {
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

  getUser(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>('/api/user');
  }
}
