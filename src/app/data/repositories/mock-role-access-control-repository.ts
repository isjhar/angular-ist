import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';
import {
  RoleAccessControlRepository,
  StoreRoleAccessControlRequestParams,
} from 'src/app/domain/repositories/role-access-control-repository';

export class MockRoleAccessControlRepository
  implements RoleAccessControlRepository
{
  static items: RoleAccessControl[] = [
    {
      roleId: 1,
      accessControlId: 1,
    },
    {
      roleId: 1,
      accessControlId: 2,
    },
    {
      roleId: 2,
      accessControlId: 1,
    },
    {
      roleId: 2,
      accessControlId: 2,
    },
  ];

  get(params: PaginationParams): Observable<Pagination<RoleAccessControl>> {
    let items = [...MockRoleAccessControlRepository.items];
    let search = params.search;
    let limit = params.limit ? params.limit : items.length;
    let page = params.page ? params.page : 0;

    let paginatedRoles = items.splice((page - 1) * limit, limit);
    return of({ total: items.length, data: paginatedRoles });
  }
  store(
    params: StoreRoleAccessControlRequestParams
  ): Observable<RoleAccessControl> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
