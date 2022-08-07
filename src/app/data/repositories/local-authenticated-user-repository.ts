import { Observable } from 'rxjs';
import { User } from 'src/app/auth.service';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';

export class LocalAuthenticatedUserRepository extends AuthenticatedUserRepository {
  readonly IS_LOGGED_IN = 'IS_LOGGED_IN';
  readonly LOGGED_USER = 'LOGGED_USER';

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      observer.next(localStorage.getItem(this.IS_LOGGED_IN) !== null);
      observer.complete();
    });
  }
  store(user: User): Observable<void> {
    return new Observable<void>((observer) => {
      localStorage.setItem(this.IS_LOGGED_IN, 'true');
      localStorage.setItem(this.LOGGED_USER, JSON.stringify(user));
      observer.next();
      observer.complete();
    });
  }
  delete(): Observable<void> {
    return new Observable<void>((observer) => {
      localStorage.removeItem(this.IS_LOGGED_IN);
      localStorage.removeItem(this.LOGGED_USER);
      observer.next();
      observer.complete();
    });
  }
}
