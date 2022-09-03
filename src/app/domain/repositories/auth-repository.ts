import { Observable } from 'rxjs';
import { User } from '../entities/user';

export interface AuthRepository {
  getCsrfToken(): Observable<any>;
  login(data: LoginParams): Observable<any>;
  logout(): Observable<any>;
  getLoggedInUser(): Observable<User>;
}
export interface LoginParams {
  email: string;
  password: string;
}
