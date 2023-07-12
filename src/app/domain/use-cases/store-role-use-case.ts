import { StoreUseCase } from '../base-use-cases/store-use-case';
import { Role } from '../entities/role';
import { StoreRoleRequestParams } from '../repositories/role-repository';

export class StoreRoleUseCase extends StoreUseCase<
  StoreRoleUseCaseParams,
  StoreRoleRequestParams,
  Role
> {
  mapParams(params: StoreRoleUseCaseParams): StoreRoleRequestParams {
    return params;
  }
}

export interface StoreRoleUseCaseParams {
  name: string;
}
