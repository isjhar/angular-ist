import { DeletableRepository } from '../base-repositories/deletable-repository';
import { GetableRepository } from '../base-repositories/getable-repository';
import { StorableRepository } from '../base-repositories/storeable-repository';
import { UpdatableRepository } from '../base-repositories/updatable-repository';
import { Menu } from '../entities/menu';
import { PaginationParams } from '../entities/pagination-params';

export interface MenuRepository
  extends GetableRepository<PaginationParams, Menu>,
    StorableRepository<StoreMenuRequestParams, Menu>,
    UpdatableRepository<StoreMenuRequestParams>,
    DeletableRepository {}

export interface StoreMenuRequestParams {
  name: string;
  url: string;
}
