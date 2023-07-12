import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { PaginationParams } from '../entities/pagination-params';
import { GetableRepository } from '../base-repositories/getable-repository';
import { Breadcrumb } from '../entities/breadcrumb';

export class GetBreadcrumbsUseCase extends GetUseCase<
  GetUseCaseParams,
  PaginationParams,
  Breadcrumb
> {
  constructor(
    getableRepository: GetableRepository<PaginationParams, Breadcrumb>
  ) {
    super(getableRepository);
  }
  mapParams(params: GetUseCaseParams): PaginationParams {
    return params;
  }
}
