import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../entities/role';
import {
  RoleRepository,
  StoreRoleRequestParams,
} from '../repositories/role-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class StoreRoleUseCaseService
  implements UseCase<StoreRoleRequestParams, Role>
{
  constructor(private roleRepository: RoleRepository) {}
  execute(params: StoreRoleRequestParams): Observable<Role> {
    return this.roleRepository.store(params);
  }
}
