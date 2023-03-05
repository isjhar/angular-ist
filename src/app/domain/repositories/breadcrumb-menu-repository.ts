import { GetableRepository } from '../base-repositories/getable-repository';
import { Menu } from '../entities/menu';
import { PaginationParams } from '../entities/pagination-params';

export interface BreadcrumbMenuRepository
  extends GetableRepository<PaginationParams, Menu> {}
