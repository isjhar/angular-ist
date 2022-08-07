import { Observable } from 'rxjs';
import { User } from 'src/app/auth.service';

export abstract class AuthenticatedUserRepository {
  abstract isLoggedIn(): Observable<boolean>;
  abstract store(user: User): Observable<void>;
  abstract delete(): Observable<void>;
}
