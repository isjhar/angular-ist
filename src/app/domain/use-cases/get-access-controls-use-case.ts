import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { PaginationParams } from '../entities/pagination-params';
import { GetableRepository } from '../base-repositories/getable-repository';
import { AccessControl } from '../entities/access-control';

export class GetAccessControlsUseCase extends GetUseCase<
  GetUseCaseParams,
  PaginationParams,
  AccessControl
> {
  constructor(
    getableRepository: GetableRepository<PaginationParams, AccessControl>
  ) {
    super(getableRepository);
  }
  mapParams(params: GetUseCaseParams): PaginationParams {
    return params;
  }
}
