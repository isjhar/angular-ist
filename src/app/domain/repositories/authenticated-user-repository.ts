import { Observable } from 'rxjs';
import { User } from '../entities/user';

export interface AuthenticatedUserRepository {
  getAuthenticatedUser(): Observable<User>;
  isAuthenticated(): Observable<boolean>;
  store(user: User): Observable<void>;
  delete(): Observable<void>;
}
