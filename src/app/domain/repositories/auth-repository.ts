import { Observable } from 'rxjs';
import { User } from '../entities/user';

export abstract class AuthRepository {
  abstract getCsrfToken(): Observable<any>;
  abstract login(data: LoginParams): Observable<any>;
  abstract logout(): Observable<any>;
}
export interface LoginParams {
  email: string;
  password: string;
}
