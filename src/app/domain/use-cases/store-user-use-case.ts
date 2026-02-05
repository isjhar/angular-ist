import { UserDetail } from 'src/app/domain/entities/user-detail';
import { StoreUseCase } from '../base-use-cases/store-use-case';
import { User } from '../entities/user';
import { StoreUserRequestParams } from '../repositories/user-repository';

export class StoreUserUseCase extends StoreUseCase<
  StoreUserUseCaseParams,
  StoreUserRequestParams,
  UserDetail
> {
  mapParams(params: StoreUserUseCaseParams): StoreUserRequestParams {
    return params;
  }
}

export interface StoreUserUseCaseParams {
  email: string;
  name: string;
  password: string;
  roles: number[];
}
