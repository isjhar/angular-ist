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
import { RoleDetail } from 'src/app/domain/entities/role-detail';

export interface RoleRepository
  extends GetableRepository<PaginationParams, RoleList>,
    StorableRepository<StoreRoleRequestParams, Role>,
    UpdatableRepository<UpdateRoleRequestParams>,
    DeletableRepository,
    FindableRepository<RoleDetail> {
  getRoleAccessControls(
    params: GetRoleAccessControlsRequestParams,
  ): Observable<RoleAccessControl[]>;
  storeAccessControl(params: StoreAccessControlRequestParams): Observable<void>;
  deleteAccessControl(
    params: DeleteAccessControlRequestParams,
  ): Observable<void>;
  syncAccessControl(params: SyncAccessControlRequestParams): Observable<void>;
}

export interface StoreRoleRequestParams {
  name: string;
}

export interface UpdateRoleRequestParams {
  accessControls: string[];
}

export interface GetRoleAccessControlsRequestParams extends PaginationParams {
  roleId: number;
}

export interface StoreAccessControlRequestParams {
  roleId: number;
  accessControlId: string;
}

export interface DeleteAccessControlRequestParams {
  roleId: number;
  accessControlId: string;
}

export interface SyncAccessControlRequestParams {
  roleId: number;
  accessControlIds: string[];
}
