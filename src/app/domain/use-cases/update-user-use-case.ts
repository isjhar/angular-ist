import {
  UpdateUseCase,
  UpdateUseCaseParams,
} from '../base-use-cases/update-use-case';
import { StoreUserRequestParams } from '../repositories/user-repository';

export class UpdateUserUseCase extends UpdateUseCase<
  UpdateUserUseCaseParams,
  StoreUserRequestParams
> {
  mapParams(params: UpdateUserUseCaseParams): StoreUserRequestParams {
    return {
      email: params.email,
      name: params.name,
      password: params.password,
      roles: params.roles,
    };
  }
}

export interface UpdateUserUseCaseParams extends UpdateUseCaseParams {
  email: string;
  name: string;
  password: string;
  roles: number[];
}
