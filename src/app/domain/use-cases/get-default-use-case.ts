import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { PaginationParams } from '../entities/pagination-params';
import { GetableRepository } from '../base-repositories/getable-repository';

export class GetDefaultUseCase<T> extends GetUseCase<
  GetUseCaseParams,
  PaginationParams,
  T
> {
  constructor(getableRepository: GetableRepository<PaginationParams, T>) {
    super(getableRepository);
  }
  mapParams(params: GetUseCaseParams): PaginationParams {
    return params;
  }
}
