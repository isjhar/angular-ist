import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { PaginationParams } from '../entities/pagination-params';
import { GetableRepository } from '../base-repositories/getable-repository';
import { Menu } from '../entities/menu';

export class GetMenusUseCase extends GetUseCase<
  GetUseCaseParams,
  PaginationParams,
  Menu
> {
  constructor(getableRepository: GetableRepository<PaginationParams, Menu>) {
    super(getableRepository);
  }
  mapParams(params: GetUseCaseParams): PaginationParams {
    return params;
  }
}
