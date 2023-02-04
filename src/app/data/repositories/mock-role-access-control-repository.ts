import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/domain/entities/pagination';
import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';
import {
  GetRoleAccessControlsRequestParams,
  RoleAccessControlRepository,
  StoreRoleAccessControlRequestParams,
} from 'src/app/domain/repositories/role-access-control-repository';
import { RoleAccessControlData } from '../entities/role-access-control-data';
import { MockAccessControlRepository } from './mock-access-control.repository';

export class MockRoleAccessControlRepository
  implements RoleAccessControlRepository
{
  static items: RoleAccessControlData[] = [
    {
      id: 1,
      roleId: 1,
      accessControlId: 1,
    },
    {
      id: 2,
      roleId: 1,
      accessControlId: 2,
    },
    {
      id: 3,
      roleId: 2,
      accessControlId: 1,
    },
    {
      id: 4,
      roleId: 2,
      accessControlId: 2,
    },
  ];

  get(
    params: GetRoleAccessControlsRequestParams
  ): Observable<Pagination<RoleAccessControl>> {
    let items = [...MockAccessControlRepository.items];
    let search = params.search;
    let limit = params.limit ? params.limit : items.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      items = items.filter((element) => element.name.includes(search!));
    }
    let paginatedAccessControls = items.splice((page - 1) * limit, limit);
    let data: RoleAccessControl[] = paginatedAccessControls.map((element) => {
      return {
        accessControl: element,
        id: MockRoleAccessControlRepository.items.find(
          (roleAccessControl) =>
            roleAccessControl.accessControlId == element.id &&
            roleAccessControl.roleId == params.roleId
        )?.id,
      };
    });
    return of({ total: items.length, data: data });
  }

  store(params: StoreRoleAccessControlRequestParams): Observable<void> {
    return new Observable<void>((observer) => {
      let maxId = Math.max(
        ...MockRoleAccessControlRepository.items.map((element) => element.id)
      );
      let accessControl: RoleAccessControlData = {
        id: maxId + 1,
        accessControlId: params.accessControlId,
        roleId: params.roleId,
      };
      MockRoleAccessControlRepository.items.push(accessControl);
      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<void> {
    return new Observable<any>((observer) => {
      MockRoleAccessControlRepository.items =
        MockRoleAccessControlRepository.items.filter(
          (element) => element.id != id
        );
      observer.next();
      observer.complete();
    });
  }
}
