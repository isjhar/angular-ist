import { Observable } from 'rxjs';

import { RoleRepository } from '../repositories/role-repository';
import { UseCase } from './use-case';

export class UpdateRoleUseCaseService
  implements UseCase<UpdateRoleUseCaseParams, void>
{
  constructor(private roleRepository: RoleRepository) {}
  execute(params: UpdateRoleUseCaseParams): Observable<void> {
    return this.roleRepository.update(params.id, {
      menus: params.menus,
      name: params.name,
    });
  }
}

export interface UpdateRoleUseCaseParams {
  id: number;
  name: string;
  menus: number[];
}
