import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { PaginationParams } from '../entities/pagination-params';
import { GetableRepository } from '../base-repositories/getable-repository';
import { Role } from '../entities/role';
import { RoleList } from 'src/app/domain/entities/role-list';

export class GetRolesUseCase extends GetUseCase<
  GetUseCaseParams,
  PaginationParams,
  RoleList
> {
  constructor(
    getableRepository: GetableRepository<PaginationParams, RoleList>,
  ) {
    super(getableRepository);
  }
  mapParams(params: GetUseCaseParams): PaginationParams {
    return params;
  }
}
