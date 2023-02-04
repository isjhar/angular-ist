import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { PaginationParams } from '../entities/pagination-params';
import { GetableRepository } from '../base-repositories/getable-repository';
import { RoleAccessControl } from '../entities/role-access-control';

export class GetRoleAccessControlsUseCase extends GetUseCase<
  GetUseCaseParams,
  PaginationParams,
  RoleAccessControl
> {
  constructor(
    getableRepository: GetableRepository<PaginationParams, RoleAccessControl>
  ) {
    super(getableRepository);
  }
  mapParams(params: GetUseCaseParams): PaginationParams {
    return params;
  }
}
