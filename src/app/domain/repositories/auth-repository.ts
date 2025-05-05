import { Observable } from 'rxjs';
import { User } from '../entities/user';

export interface AuthRepository {
  login(data: LoginParams): Observable<User>;
  logout(): Observable<any>;
}
export interface LoginParams {
  email: string;
  password: string;
}
