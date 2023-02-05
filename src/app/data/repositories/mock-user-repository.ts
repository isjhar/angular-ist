import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { User } from 'src/app/domain/entities/user';
import {
  StoreUserRequestParams,
  UserRepository,
} from 'src/app/domain/repositories/user-repository';
import { MockRoleRepository } from './mock-role-repository';

export class MockUserRepository implements UserRepository {
  static users: User[] = [
    {
      id: 1,
      email: 'sysadmin@gmail.com',
      name: 'Sys Admin',
      roles: [...MockRoleRepository.roles],
      password: '1234',
    },
    {
      id: 2,
      email: 'admin@gmail.com',
      name: 'Admin',
      roles: [...MockRoleRepository.roles],
      password: '1234',
    },
  ];
  get(params: PaginationParams): Observable<Pagination<User>> {
    let users = [...MockUserRepository.users];
    let search = params.search;
    let limit = params.limit ? params.limit : users.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      users = users.filter((element) => element.name.includes(search!));
    }
    let paginatedUsers = users.splice((page - 1) * limit, limit);
    return of({ total: users.length, data: paginatedUsers });
  }
  store(params: StoreUserRequestParams): Observable<User> {
    return new Observable<User>((observer) => {
      let maxId = Math.max(
        ...MockUserRepository.users.map((element) => element.id)
      );
      let user: User = {
        email: params.email,
        id: maxId,
        name: params.name,
        roles: MockRoleRepository.roles.filter((element) =>
          params.roles.includes(element.id)
        ),
        password: params.password,
      };
      MockUserRepository.users.push(user);
      observer.next(user);
      observer.complete();
    });
  }
  update(id: number, params: StoreUserRequestParams): Observable<void> {
    return new Observable<void>((observer) => {
      let user = MockUserRepository.users.find((element) => element.id == id);
      if (user == undefined) {
        observer.error('user not found');
      }
      user!.name = params.name;
      user!.roles = MockRoleRepository.roles.filter((element) =>
        params.roles.includes(element.id)
      );
      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      MockUserRepository.users = MockUserRepository.users.filter(
        (element) => element.id != id
      );
      observer.next();
      observer.complete();
    });
  }
}
