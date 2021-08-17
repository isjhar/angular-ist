import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) {

  }

  getCsrfToken(): Observable<any> {
    return this.http.get('/sanctum/csrf-cookie');
  }

  login(): Observable<any> {
    let data = {
      email: 'isjhar@gmail.com',
      password: 'muhtarudinB102!'
    }
    let headers = new HttpHeaders({
      Accept: 'text/html'
    })
    return this.http.post('/auth/login', data, {
      headers: headers,
      withCredentials: true,
      responseType: 'text',
      observe: 'response'
    });
  }

  getUser(): Observable<any> {
    return this.http.get('/api/user');
  }
}
