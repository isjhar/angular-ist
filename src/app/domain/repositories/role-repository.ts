import { DeletableRepository } from '../base-repositories/deletable-repository';
import { GetableRepository } from '../base-repositories/getable-repository';
import { StorableRepository } from '../base-repositories/storeable-repository';
import { UpdatableRepository } from '../base-repositories/updatable-repository';
import { PaginationParams } from '../entities/pagination-params';
import { Role } from '../entities/role';

export interface RoleRepository
  extends GetableRepository<PaginationParams, Role>,
    StorableRepository<StoreRoleRequestParams, Role>,
    UpdatableRepository<StoreRoleRequestParams>,
    DeletableRepository {}

export interface StoreRoleRequestParams {
  name: string;
  menus: number[];
}
