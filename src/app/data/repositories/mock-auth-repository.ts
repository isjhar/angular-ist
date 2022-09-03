import { Observable, of } from 'rxjs';
import { User } from 'src/app/domain/entities/user';
import {
  AuthRepository,
  LoginParams,
} from 'src/app/domain/repositories/auth-repository';
import { MockUserRepository } from './mock-user-repository';

export class MockAuthRepository implements AuthRepository {
  loggedInUser?: User;
  getCsrfToken(): Observable<any> {
    return of({});
  }
  login(data: LoginParams): Observable<any> {
    return new Observable<any>((observer) => {
      this.loggedInUser = MockUserRepository.users.find(
        (element) => element.email == data.email
      );
      if (this.loggedInUser) {
        this.setCookie('laravel_session', 'test', 100);
        observer.next();
        observer.complete();
        return;
      }
      observer.error('user not found');
      observer.complete();
    });
  }
  getLoggedInUser(): Observable<User> {
    return of(this.loggedInUser!);
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
