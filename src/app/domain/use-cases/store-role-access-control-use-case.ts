import { StoreUseCase } from '../base-use-cases/store-use-case';
import { RoleAccessControl } from '../entities/role-access-control';
import { StoreRoleAccessControlRequestParams } from '../repositories/role-access-control-repository';

export class StoreRoleAccessControlUseCase extends StoreUseCase<
  StoreRoleAccessControlUseCaseParams,
  StoreRoleAccessControlRequestParams,
  void
> {
  mapParams(
    params: StoreRoleAccessControlUseCaseParams
  ): StoreRoleAccessControlRequestParams {
    return params;
  }
}

export interface StoreRoleAccessControlUseCaseParams {
  roleId: number;
  accessControlId: number;
}
