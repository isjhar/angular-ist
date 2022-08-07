import { Observable, of } from 'rxjs';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { Role } from 'src/app/domain/entities/role';
import {
  RoleRepository,
  StoreRoleRequestParams,
  UpdateRoleRequestParams,
} from 'src/app/domain/repositories/role-repository';

export class MockRoleRepository extends RoleRepository {
  menus: Menu[] = [
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
  ];

  roles: Role[] = [
    {
      id: 1,
      name: 'Sys Admin',
      menus: this.menus,
    },
    {
      id: 2,
      name: 'Admin',
      menus: this.menus,
    },
  ];

  get(params: PaginationParams): Observable<Pagination<Role>> {
    let roles = this.roles;
    let search = params.search;
    let limit = params.limit ? params.limit : roles.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      roles = roles.filter((element) => element.name.includes(search!));
    }
    roles = roles.splice(page * limit, limit);
    return of({ total: this.roles.length, data: roles });
  }
  store(params: StoreRoleRequestParams): Observable<Role> {
    return new Observable<Role>((observer) => {
      let maxId = Math.max(...this.roles.map((element) => element.id));
      let menu: Role = {
        id: maxId + 1,
        name: params.name,
        menus: this.menus.filter((e) => params.menus.includes(e.id)),
      };
      observer.next(menu);
      observer.complete();
    });
  }
  update(params: UpdateRoleRequestParams): Observable<any> {
    return new Observable<any>((observer) => {
      let menu = this.roles.find((element) => element.id == params.id);
      if (menu == undefined) {
        observer.error('role not found');
      }
      menu!.name = params.name;
      menu!.menus = this.menus.filter((e) => params.menus.includes(e.id));

      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.roles = this.roles.filter((element) => element.id != id);
      observer.next();
      observer.complete();
    });
  }
}
