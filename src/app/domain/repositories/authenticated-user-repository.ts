import { Observable } from 'rxjs';
import { User } from '../entities/user';

export abstract class AuthenticatedUserRepository {
  abstract getAuthenticatedUser(): Observable<User>;
  abstract isAuthenticated(): Observable<boolean>;
  abstract store(user: User): Observable<void>;
  abstract delete(): Observable<void>;
}
