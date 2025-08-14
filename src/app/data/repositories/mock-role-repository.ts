import { Observable, of, throwError } from 'rxjs';
import { Error } from 'src/app/domain/entities/error';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { Role } from 'src/app/domain/entities/role';
import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';
import {
  GetRoleAccessControlsRequestParams,
  RoleRepository,
  StoreAccessControlRequestParams,
  StoreRoleRequestParams,
  UpdateRoleRequestParams,
} from 'src/app/domain/repositories/role-repository';
import { MockAccessControlRepository } from './mock-access-control.repository';
import { RoleList } from 'src/app/domain/entities/role-list';
import { AccessControl } from 'src/app/domain/entities/access-control';
import { RoleDetail } from 'src/app/domain/entities/role-detail';

interface MockRole {
  id: number;
  name: string;
  accessControls: AccessControl[];
  isEditable: boolean;
}

export class MockRoleRepository implements RoleRepository {
  static roles: MockRole[] = [
    {
      id: 1,
      name: 'Sys Admin',
      accessControls: [...MockAccessControlRepository.items],
      isEditable: false,
    },
    {
      id: 2,
      name: 'Admin',
      accessControls: [...MockAccessControlRepository.items],
      isEditable: true,
    },
  ];

  get(params: PaginationParams): Observable<Pagination<RoleList>> {
    let roles = [...MockRoleRepository.roles];
    let search = params.search;
    let limit = params.limit ? params.limit : roles.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      roles = roles.filter((element) =>
        element.name.toLowerCase().includes(search?.toLowerCase() ?? ''),
      );
    }
    let paginatedRoles = roles.splice(page * limit, limit);
    return of({ total: roles.length, items: paginatedRoles });
  }
  store(params: StoreRoleRequestParams): Observable<Role> {
    return new Observable<Role>((observer) => {
      let duplicateRole = MockRoleRepository.roles.find(
        (x) => x.name == params.name,
      );
      if (duplicateRole) {
        observer.error(Error.DuplicateItem);
        observer.complete();
        return;
      }

      let maxId = Math.max(
        ...MockRoleRepository.roles.map((element) => element.id),
      );
      let role: MockRole = {
        id: maxId + 1,
        name: params.name,
        accessControls: [],
        isEditable: true,
      };
      MockRoleRepository.roles.push(role);
      observer.next(role);
      observer.complete();
    });
  }
  update(id: number, params: UpdateRoleRequestParams): Observable<void> {
    return new Observable<void>((observer) => {
      let role = MockRoleRepository.roles.find((element) => element.id == id);
      if (role == undefined) {
        observer.error('role not found');
      }
      role!.accessControls = MockAccessControlRepository.items.filter((e) =>
        params.accessControls.includes(e.id),
      );

      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      MockRoleRepository.roles = MockRoleRepository.roles.filter(
        (element) => element.id != id,
      );
      observer.next();
      observer.complete();
    });
  }

  getRoleAccessControls(
    params: GetRoleAccessControlsRequestParams,
  ): Observable<Pagination<RoleAccessControl>> {
    return new Observable<Pagination<RoleAccessControl>>((observer) => {
      let items = [...MockAccessControlRepository.items];
      let search = params.search;
      let limit = params.limit ? params.limit : items.length;
      let page = params.page ? params.page : 0;

      if (search != undefined) {
        items = items.filter((element) => element.name.includes(search!));
      }
      let total = items.length;
      let paginatedAccessControls = items.splice(page * limit, limit);
      let role = MockRoleRepository.roles.find(
        (role) => role.id == params.roleId,
      );
      if (role == undefined) {
        observer.error('not found');
        observer.complete();
        return;
      }
      let data: RoleAccessControl[] = paginatedAccessControls.map((element) => {
        return {
          accessControl: element,
          id: role?.accessControls.find(
            (accessControl) => accessControl.id == element.id,
          )?.id,
        };
      });
      observer.next({ total: total, items: data });
      observer.complete();
    });
  }
  storeAccessControl(
    params: StoreAccessControlRequestParams,
  ): Observable<void> {
    return new Observable<void>((observer) => {
      let role = MockRoleRepository.roles.find(
        (role) => role.id == params.roleId,
      );
      if (role == undefined) {
        observer.error('not found');
        observer.complete();
        return;
      }
      let accessControl = MockAccessControlRepository.items.find(
        (accessControl) => accessControl.id == params.accessControlId,
      );
      if (accessControl == undefined) {
        observer.error('not found');
        observer.complete();
        return;
      }
      role.accessControls.push(accessControl);
      observer.next();
      observer.complete();
    });
  }
  deleteAccessControl(
    params: StoreAccessControlRequestParams,
  ): Observable<void> {
    return new Observable<void>((observer) => {
      let role = MockRoleRepository.roles.find(
        (role) => role.id == params.roleId,
      );
      if (role == undefined) {
        observer.error('not found');
        observer.complete();
        return;
      }
      role.accessControls = role.accessControls.filter(
        (accessControl) => accessControl.id != params.accessControlId,
      );
      observer.next();
      observer.complete();
    });
  }

  find(id: number): Observable<RoleDetail> {
    return new Observable((observer) => {
      let role = MockRoleRepository.roles.find((x) => x.id == id);
      if (role) {
        observer.next(role);
        observer.complete();
        return;
      }
      observer.error(Error.ItemNotFound);
      observer.complete();
    });
  }
}
