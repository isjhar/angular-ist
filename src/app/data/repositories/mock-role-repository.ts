import { Observable, of } from 'rxjs';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { Role } from 'src/app/domain/entities/role';
import {
  RoleRepository,
  StoreRoleRequestParams,
} from 'src/app/domain/repositories/role-repository';
import { MockMenuRepository } from './mock-menu-repository';

export class MockRoleRepository extends RoleRepository {
  static roles: Role[] = [
    {
      id: 1,
      name: 'Sys Admin',
      menus: MockMenuRepository.menus,
    },
    {
      id: 2,
      name: 'Admin',
      menus: MockMenuRepository.menus,
    },
  ];

  get(params: PaginationParams): Observable<Pagination<Role>> {
    let roles = MockRoleRepository.roles;
    let search = params.search;
    let limit = params.limit ? params.limit : roles.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      roles = roles.filter((element) => element.name.includes(search!));
    }
    roles = roles.splice(page * limit, limit);
    return of({ total: MockRoleRepository.roles.length, data: roles });
  }
  store(params: StoreRoleRequestParams): Observable<Role> {
    return new Observable<Role>((observer) => {
      let maxId = Math.max(
        ...MockRoleRepository.roles.map((element) => element.id)
      );
      let menu: Role = {
        id: maxId + 1,
        name: params.name,
        menus: MockMenuRepository.menus.filter((e) =>
          params.menus.includes(e.id)
        ),
      };
      observer.next(menu);
      observer.complete();
    });
  }
  update(id: number, params: StoreRoleRequestParams): Observable<any> {
    return new Observable<any>((observer) => {
      let menu = MockRoleRepository.roles.find((element) => element.id == id);
      if (menu == undefined) {
        observer.error('role not found');
      }
      menu!.name = params.name;
      menu!.menus = MockMenuRepository.menus.filter((e) =>
        params.menus.includes(e.id)
      );

      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<any> {
    return new Observable<any>((observer) => {
      MockRoleRepository.roles = MockRoleRepository.roles.filter(
        (element) => element.id != id
      );
      observer.next();
      observer.complete();
    });
  }
}
