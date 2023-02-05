import { DeletableRepository } from '../base-repositories/deletable-repository';
import { GetableRepository } from '../base-repositories/getable-repository';
import { StorableRepository } from '../base-repositories/storeable-repository';
import { UpdatableRepository } from '../base-repositories/updatable-repository';
import { AccessControl } from '../entities/access-control';
import { PaginationParams } from '../entities/pagination-params';

export interface AccessControlRepository
  extends GetableRepository<GetAccessControlsRequestParams, AccessControl>,
    StorableRepository<StoreAccessControlRequestParams, AccessControl>,
    UpdatableRepository<StoreAccessControlRequestParams>,
    DeletableRepository {}

export interface StoreAccessControlRequestParams {
  name: string;
  description: string;
}

export interface GetAccessControlsRequestParams extends PaginationParams {
  roleIds?: number[];
}
