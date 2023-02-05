import { Observable } from 'rxjs';
import { UseCase } from '../base-use-cases/use-case';
import { RoleRepository } from '../repositories/role-repository';

export class StoreRoleAccessControlUseCase
  implements UseCase<StoreRoleAccessControlUseCaseParams, void>
{
  constructor(private roleRepository: RoleRepository) {}
  execute(params: StoreRoleAccessControlUseCaseParams): Observable<void> {
    return this.roleRepository.storeAccessControl(params);
  }
}

export interface StoreRoleAccessControlUseCaseParams {
  roleId: number;
  accessControlId: number;
}
