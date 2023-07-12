import { RoleAccessControl } from '../entities/role-access-control';
import { UseCase } from '../base-use-cases/use-case';
import {
  GetUseCaseParams,
  GetUseCaseResponse,
} from '../base-use-cases/get-use-case';
import { RoleRepository } from '../repositories/role-repository';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from '../entities/pagination';

export class GetRoleAccessControlsUseCase
  implements
    UseCase<
      GetRoleAccessControlsUseCaseParams,
      GetUseCaseResponse<RoleAccessControl>
    >
{
  constructor(private roleRepository: RoleRepository) {}
  execute(
    params: GetRoleAccessControlsUseCaseParams
  ): Observable<GetUseCaseResponse<RoleAccessControl>> {
    return this.roleRepository.getRoleAccessControls(params).pipe(
      map<Pagination<RoleAccessControl>, GetUseCaseResponse<RoleAccessControl>>(
        (element) => {
          return { pagination: element };
        }
      )
    );
  }
}

export interface GetRoleAccessControlsUseCaseParams extends GetUseCaseParams {
  roleId: number;
}
