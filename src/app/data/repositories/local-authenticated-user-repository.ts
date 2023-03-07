import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { User } from 'src/app/domain/entities/user';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';

export class LocalAuthenticatedUserRepository
  implements AuthenticatedUserRepository
{
  readonly IS_LOGGED_IN = 'IS_LOGGED_IN';
  readonly LOGGED_USER = 'LOGGED_USER';

  loggedUser?: User;

  getAuthenticatedUser(): Observable<User> {
    return new Observable<User>((observer) => {
      var loggedUser = localStorage.getItem(this.LOGGED_USER);
      if (loggedUser === null) {
        observer.error('userNotFound');
        observer.complete();
      }
      let userRaw = JSON.parse(loggedUser!);
      let user = new User({
        id: userRaw.id,
        email: userRaw.email,
        name: userRaw.name,
        roles: userRaw.roles.map((role: any) => {
          return {
            id: role.id,
            name: role.name,
            accessControls: role.access_controls.map((accessControl: any) => {
              return {
                id: accessControl.id,
                name: accessControl.name,
                description: accessControl.description,
              };
            }),
          };
        }),
        password: userRaw.password,
      });
      observer.next(user);
      observer.complete();
    });
  }

  isAuthenticated(): Observable<boolean> {
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

  hasAccessControl(accessControlId: AccessControlId): Observable<boolean> {
    return this.getAuthenticatedUser().pipe(
      map<User, boolean>((user) => user?.hasAccessControl(accessControlId))
    );
  }
}
