import { StoreUseCase } from '../base-use-cases/store-use-case';
import { AccessControl } from '../entities/access-control';
import { StoreAccessControlRequestParams } from '../repositories/access-control-repository';

export class StoreAccessControlUseCase extends StoreUseCase<
  StoreAccessControlUseCaseParams,
  StoreAccessControlRequestParams,
  AccessControl
> {
  mapParams(
    params: StoreAccessControlUseCaseParams
  ): StoreAccessControlRequestParams {
    return params;
  }
}

export interface StoreAccessControlUseCaseParams {
  name: string;
  description: string;
}
