import { Observable, of } from 'rxjs';
import { User } from 'src/app/domain/entities/user';
import {
  AuthRepository,
  LoginParams,
} from 'src/app/domain/repositories/auth-repository';

export class MockAuthRepository extends AuthRepository {
  users: User[] = [
    {
      email: 'sysadmin@gmail.com',
      name: 'Sys Admin',
      role_names: 'Sys Admin',
      roles: [
        {
          id: 1,
          menus: [
            {
              id: 1,
              name: 'Dashboard',
              url: '/',
            },
            {
              id: 2,
              name: 'Setting',
              url: '/setting',
            },
          ],
          name: 'Admin',
        },
      ],
    },
    {
      email: 'admin@gmail.com',
      name: 'Admin',
      role_names: 'Admin',
      roles: [
        {
          id: 1,
          menus: [
            {
              id: 1,
              name: 'Dashboard',
              url: '/',
            },
            {
              id: 2,
              name: 'Setting',
              url: '/setting',
            },
          ],
          name: 'Admin',
        },
      ],
    },
  ];

  loggedUser?: User;

  getLoggedUser(): Observable<User> {
    return of(this.loggedUser!);
  }
  getCsrfToken(): Observable<any> {
    return of({});
  }
  login(data: LoginParams): Observable<any> {
    return new Observable<any>((observer) => {
      this.loggedUser = this.users.find(
        (element) => element.email == data.email
      );
      if (this.loggedUser) {
        this.setCookie('laravel_session', 'test', 100);
        observer.next();
        observer.complete();
        return;
      }
      observer.error('user not found');
      observer.complete();
    });
  }
  logout(): Observable<any> {
    return of({});
  }

  private setCookie(
    name: string,
    value: string,
    expireDays: number,
    path: string = ''
  ) {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
}
