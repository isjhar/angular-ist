import { Observable } from 'rxjs';
import { DeletableRepository } from '../base-repositories/deletable-repository';
import { FindableRepository } from '../base-repositories/findable-repository';
import { GetableRepository } from '../base-repositories/getable-repository';
import { StorableRepository } from '../base-repositories/storeable-repository';
import { UpdatableRepository } from '../base-repositories/updatable-repository';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { Role } from '../entities/role';
import { RoleAccessControl } from '../entities/role-access-control';
import { RoleList } from 'src/app/domain/entities/role-list';

export interface RoleRepository
  extends GetableRepository<PaginationParams, RoleList>,
    StorableRepository<StoreRoleRequestParams, Role>,
    UpdatableRepository<UpdateRoleRequestParams>,
    DeletableRepository,
    FindableRepository<Role> {
  getRoleAccessControls(
    params: GetRoleAccessControlsRequestParams,
  ): Observable<Pagination<RoleAccessControl>>;
  storeAccessControl(params: StoreAccessControlRequestParams): Observable<void>;
  deleteAccessControl(
    params: DeleteAccessControlRequestParams,
  ): Observable<void>;
}

export interface StoreRoleRequestParams {
  name: string;
}

export interface UpdateRoleRequestParams {
  accessControls: number[];
}

export interface GetRoleAccessControlsRequestParams extends PaginationParams {
  roleId: number;
}

export interface StoreAccessControlRequestParams {
  roleId: number;
  accessControlId: number;
}

export interface DeleteAccessControlRequestParams {
  roleId: number;
  accessControlId: number;
}
