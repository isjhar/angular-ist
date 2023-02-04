import { DeletableRepository } from '../base-repositories/deletable-repository';
import { GetableRepository } from '../base-repositories/getable-repository';
import { StorableRepository } from '../base-repositories/storeable-repository';
import { PaginationParams } from '../entities/pagination-params';
import { RoleAccessControl } from '../entities/role-access-control';

export interface RoleAccessControlRepository
  extends StorableRepository<
      StoreRoleAccessControlRequestParams,
      RoleAccessControl
    >,
    DeletableRepository {}

export interface StoreRoleAccessControlRequestParams {
  roleId: number;
  accessControlId: number;
}
