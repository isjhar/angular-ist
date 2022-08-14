import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleRepository } from '../repositories/role-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class DeleteRoleUseCaseService
  implements UseCase<DeleteRoleUseCaseParams, void>
{
  constructor(private roleRepository: RoleRepository) {}
  execute(params: DeleteRoleUseCaseParams): Observable<void> {
    return this.roleRepository.delete(params.id);
  }
}

export interface DeleteRoleUseCaseParams {
  id: number;
}
