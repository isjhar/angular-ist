import { DeletableRepository } from '../base-repositories/deletable-repository';
import { GetableRepository } from '../base-repositories/getable-repository';
import { StorableRepository } from '../base-repositories/storeable-repository';

export interface RoleAccessControlRepository
  extends StorableRepository<StoreRoleAccessControlRequestParams, void>,
    DeletableRepository {}

export interface StoreRoleAccessControlRequestParams {
  roleId: number;
  accessControlId: number;
}

export interface GetRoleAccessControlParams {
  roleId?: number;
}
