import { StoreMenuRequestParams } from '../repositories/menu-repository';
import {
  UpdateUseCase,
  UpdateUseCaseParams,
} from '../base-use-cases/update-use-case';

export class UpdateMenuUseCase extends UpdateUseCase<
  UpdateMenuUseCaseParams,
  StoreMenuRequestParams
> {
  mapParams(params: UpdateMenuUseCaseParams): StoreMenuRequestParams {
    return {
      name: params.name,
      url: params.url,
    };
  }
}

export interface UpdateMenuUseCaseParams extends UpdateUseCaseParams {
  name: string;
  url: string;
}
