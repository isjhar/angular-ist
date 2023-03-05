import { GetableRepository } from '../base-repositories/getable-repository';
import { Breadcrumb } from '../entities/breadcrumb';
import { PaginationParams } from '../entities/pagination-params';

export interface BreadcrumbRepository
  extends GetableRepository<PaginationParams, Breadcrumb> {}
