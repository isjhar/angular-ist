import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { Role } from 'src/app/domain/entities/role';
import {
  RoleRepository,
  StoreRoleRequestParams,
  UpdateRoleRequestParams,
} from 'src/app/domain/repositories/role-repository';
import { MockAccessControlRepository } from './mock-access-control.repository';

export class MockRoleRepository implements RoleRepository {
  static roles: Role[] = [
    {
      id: 1,
      name: 'Sys Admin',
      accessControls: [...MockAccessControlRepository.items],
    },
    {
      id: 2,
      name: 'Admin',
      accessControls: [...MockAccessControlRepository.items],
    },
  ];

  get(params: PaginationParams): Observable<Pagination<Role>> {
    let roles = [...MockRoleRepository.roles];
    let search = params.search;
    let limit = params.limit ? params.limit : roles.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      roles = roles.filter((element) => element.name.includes(search!));
    }
    let paginatedRoles = roles.splice((page - 1) * limit, limit);
    return of({ total: roles.length, data: paginatedRoles });
  }
  store(params: StoreRoleRequestParams): Observable<Role> {
    return new Observable<Role>((observer) => {
      let maxId = Math.max(
        ...MockRoleRepository.roles.map((element) => element.id)
      );
      let role: Role = {
        id: maxId + 1,
        name: params.name,
        accessControls: [],
      };
      MockRoleRepository.roles.push(role);
      observer.next(role);
      observer.complete();
    });
  }
  update(id: number, params: UpdateRoleRequestParams): Observable<any> {
    return new Observable<any>((observer) => {
      let role = MockRoleRepository.roles.find((element) => element.id == id);
      if (role == undefined) {
        observer.error('role not found');
      }
      role!.accessControls = MockAccessControlRepository.items.filter((e) =>
        params.accessControls.includes(e.id)
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
