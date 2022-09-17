import {
  UpdateUseCase,
  UpdateUseCaseParams,
} from '../base-use-cases/update-use-case';
import { StoreRoleRequestParams } from '../repositories/role-repository';

export class UpdateRoleUseCase extends UpdateUseCase<
  UpdateRoleUseCaseParams,
  StoreRoleRequestParams
> {
  mapParams(params: UpdateRoleUseCaseParams): StoreRoleRequestParams {
    return {
      name: params.name,
      menus: params.menus,
    };
  }
}

export interface UpdateRoleUseCaseParams extends UpdateUseCaseParams {
  name: string;
  menus: number[];
}
