import { Observable } from 'rxjs';
import { UseCase } from '../base-use-cases/use-case';
import { RoleRepository } from '../repositories/role-repository';

export class DeleteRoleAccessControlUseCase
  implements UseCase<DeleteRoleAccessControlUseCaseParams, void>
{
  constructor(private roleRepository: RoleRepository) {}
  execute(params: DeleteRoleAccessControlUseCaseParams): Observable<void> {
    return this.roleRepository.deleteAccessControl(params);
  }
}

export interface DeleteRoleAccessControlUseCaseParams {
  roleId: number;
  accessControlId: number;
}
