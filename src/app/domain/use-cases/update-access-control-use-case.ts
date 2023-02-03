import {
  UpdateUseCase,
  UpdateUseCaseParams,
} from '../base-use-cases/update-use-case';
import { StoreAccessControlRequestParams } from '../repositories/access-control-repository';

export class UpdateAccessControlUseCase extends UpdateUseCase<
  UpdateAccessControlUseCaseParams,
  StoreAccessControlRequestParams
> {
  mapParams(
    params: UpdateAccessControlUseCaseParams
  ): StoreAccessControlRequestParams {
    return {
      name: params.name,
      description: params.description,
    };
  }
}

export interface UpdateAccessControlUseCaseParams extends UpdateUseCaseParams {
  name: string;
  description: string;
}
