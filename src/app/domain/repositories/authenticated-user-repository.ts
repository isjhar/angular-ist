import { Observable } from 'rxjs';
import { User } from '../entities/user';

export abstract class AuthenticatedUserRepository {
  abstract getLoggedUser(): Observable<User>;
  abstract isLoggedIn(): Observable<boolean>;
  abstract store(user: User): Observable<void>;
  abstract delete(): Observable<void>;
}
