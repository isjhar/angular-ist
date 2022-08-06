import { Observable } from 'rxjs';

export interface AuthRepository {
  getCsrfToken(): Observable<any>;
  login(data: LoginParams): Observable<any>;
  logout(): Observable<any>;
}
export interface LoginParams {
  email: string;
  password: string;
}
