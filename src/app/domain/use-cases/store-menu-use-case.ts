import { Menu } from '../entities/menu';
import { StoreMenuRequestParams } from '../repositories/menu-repository';
import { StoreUseCase } from '../base-use-cases/store-use-case';

export class StoreMenuUseCase extends StoreUseCase<
  StoreMenuUseCaseParams,
  StoreMenuRequestParams,
  Menu
> {
  mapParams(params: StoreMenuUseCaseParams): StoreMenuRequestParams {
    return params;
  }
}

export interface StoreMenuUseCaseParams {
  name: string;
  url: string;
}
