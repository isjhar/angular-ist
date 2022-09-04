import { User } from '../entities/user';
import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { PaginationParams } from '../entities/pagination-params';
import { GetableRepository } from '../base-repositories/getable-repository';

export class GetUsersUseCase extends GetUseCase<
  GetUseCaseParams,
  PaginationParams,
  User
> {
  constructor(getableRepository: GetableRepository<PaginationParams, User>) {
    super(getableRepository);
  }
  mapParams(params: GetUseCaseParams): PaginationParams {
    return params;
  }
}
