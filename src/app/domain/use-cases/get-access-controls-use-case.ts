import { GetUseCase, GetUseCaseParams } from '../base-use-cases/get-use-case';
import { GetableRepository } from '../base-repositories/getable-repository';
import { AccessControl } from '../entities/access-control';
import { GetAccessControlsRequestParams } from '../repositories/access-control-repository';

export class GetAccessControlsUseCase extends GetUseCase<
  GetAccessControlsUseCaseParams,
  GetAccessControlsRequestParams,
  AccessControl
> {
  constructor(
    getableRepository: GetableRepository<
      GetAccessControlsRequestParams,
      AccessControl
    >
  ) {
    super(getableRepository);
  }
  mapParams(
    params: GetAccessControlsUseCaseParams
  ): GetAccessControlsRequestParams {
    return params;
  }
}

export interface GetAccessControlsUseCaseParams extends GetUseCaseParams {
  roleIds?: number[];
}
