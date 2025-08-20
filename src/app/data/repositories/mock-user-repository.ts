import { Observable, of } from 'rxjs';
import { Error } from 'src/app/domain/entities/error';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { User } from 'src/app/domain/entities/user';
import {
  ChangePasswordRequestParams,
  StoreUserRequestParams,
  UpdateUserRequestParams,
  UserRepository,
} from 'src/app/domain/repositories/user-repository';
import { MockRoleRepository } from './mock-role-repository';
import { Role } from 'src/app/domain/entities/role';
import { UserList } from 'src/app/domain/entities/user-list';
import { UserDetail } from 'src/app/domain/entities/user-detail';

interface MockUser {
  id: number;
  email: string;
  name: string;
  roles: Role[];
  password: string;
  isEditable: boolean;
}

export class MockUserRepository implements UserRepository {
  changePassword(params: ChangePasswordRequestParams): Observable<void> {
    return of();
  }

  static users: MockUser[] = [
    {
      id: 1,
      email: 'sysadmin@gmail.com',
      name: 'Sys Admin',
      roles: [MockRoleRepository.roles[0]],
      password: '1234',
      isEditable: false,
    },
    {
      id: 2,
      email: 'admin@gmail.com',
      name: 'Admin',
      roles: [MockRoleRepository.roles[1]],
      password: '1234',
      isEditable: true,
    },
    {
      id: 3,
      email: 'demo@gmail.com',
      name: 'Demo',
      roles: [MockRoleRepository.roles[1]],
      password: '1234',
      isEditable: true,
    },
  ];
  get(params: PaginationParams): Observable<Pagination<UserList>> {
    let users = [...MockUserRepository.users];
    let search = params.search;
    let limit = params.limit ? params.limit : users.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      users = users.filter((element) => element.name.includes(search!));
    }
    let totalUser = users.length;
    let paginatedUsers = users.splice(page * limit, limit);
    return of({ total: totalUser, items: paginatedUsers });
  }
  store(params: StoreUserRequestParams): Observable<UserList> {
    return new Observable<UserList>((observer) => {
      let emailUser = MockUserRepository.users.find(
        (x) => x.email == params.email,
      );
      if (emailUser) {
        observer.error(Error.DuplicateItem);
        observer.complete();
        return;
      }

      let maxId = Math.max(
        ...MockUserRepository.users.map((element) => element.id),
      );
      let user: MockUser = {
        email: params.email,
        id: maxId,
        name: params.name,
        roles: MockRoleRepository.roles.filter((element) =>
          params.roles.includes(element.id),
        ),
        password: params.password,
        isEditable: true,
      };
      MockUserRepository.users.push(user);
      observer.next({
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles,
        isEditable: user.isEditable,
      });
      observer.complete();
    });
  }
  update(id: number, params: UpdateUserRequestParams): Observable<void> {
    return new Observable<void>((observer) => {
      let user = MockUserRepository.users.find((element) => element.id == id);
      if (user == undefined) {
        observer.error('user not found');
      }
      user!.name = params.name;
      user!.roles = MockRoleRepository.roles.filter((element) =>
        params.roles.includes(element.id),
      );
      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      MockUserRepository.users = MockUserRepository.users.filter(
        (element) => element.id != id,
      );
      observer.next();
      observer.complete();
    });
  }
}
