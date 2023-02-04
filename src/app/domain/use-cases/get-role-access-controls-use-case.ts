import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { PaginationParams } from '../entities/pagination-params';
import { GetableRepository } from '../base-repositories/getable-repository';
import { RoleAccessControl } from '../entities/role-access-control';
import { GetRoleAccessControlsRequestParams } from '../repositories/role-access-control-repository';

export class GetRoleAccessControlsUseCase extends GetUseCase<
  GetRoleAccessControlsUseCaseParamsParams,
  GetRoleAccessControlsRequestParams,
  RoleAccessControl
> {
  constructor(
    getableRepository: GetableRepository<PaginationParams, RoleAccessControl>
  ) {
    super(getableRepository);
  }
  mapParams(
    params: GetRoleAccessControlsUseCaseParamsParams
  ): GetRoleAccessControlsRequestParams {
    return params;
  }
}

export interface GetRoleAccessControlsUseCaseParamsParams
  extends GetUseCaseParams {
  roleId: number;
}
