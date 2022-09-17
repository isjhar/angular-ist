import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { PaginationParams } from '../entities/pagination-params';
import { GetableRepository } from '../base-repositories/getable-repository';
import { Role } from '../entities/role';

export class GetRolesUseCase extends GetUseCase<
  GetUseCaseParams,
  PaginationParams,
  Role
> {
  constructor(getableRepository: GetableRepository<PaginationParams, Role>) {
    super(getableRepository);
  }
  mapParams(params: GetUseCaseParams): PaginationParams {
    return params;
  }
}
