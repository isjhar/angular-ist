import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { AuthenticatedUser } from 'src/app/domain/entities/authenticated-user';

export interface AuthRepository {
  login(data: LoginParams): Observable<AuthenticatedUser>;
  logout(): Observable<any>;
}
export interface LoginParams {
  email: string;
  password: string;
}
