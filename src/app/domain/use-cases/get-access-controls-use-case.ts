import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { GetableRepository } from '../base-repositories/getable-repository';
import { AccessControl } from '../entities/access-control';
import { PaginationParams } from '../entities/pagination-params';

export class GetAccessControlsUseCase extends GetUseCase<
  GetUseCaseParams,
  PaginationParams,
  AccessControl
> {
  constructor(
    getableRepository: GetableRepository<GetUseCaseParams, AccessControl>
  ) {
    super(getableRepository);
  }
  mapParams(params: GetUseCaseParams): PaginationParams {
    return params;
  }
}
