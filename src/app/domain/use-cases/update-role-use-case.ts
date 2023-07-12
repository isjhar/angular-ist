import {
  UpdateUseCase,
  UpdateUseCaseParams,
} from '../base-use-cases/update-use-case';
import { UpdateRoleRequestParams } from '../repositories/role-repository';

export class UpdateRoleUseCase extends UpdateUseCase<
  UpdateRoleUseCaseParams,
  UpdateRoleRequestParams
> {
  mapParams(params: UpdateRoleUseCaseParams): UpdateRoleRequestParams {
    return {
      accessControls: params.accessControls,
    };
  }
}

export interface UpdateRoleUseCaseParams extends UpdateUseCaseParams {
  accessControls: number[];
}
