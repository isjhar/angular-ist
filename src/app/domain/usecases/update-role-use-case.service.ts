import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RoleRepository,
  UpdateRoleRequestParams,
} from '../repositories/role-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class UpdateRoleUseCaseService
  implements UseCase<UpdateRoleRequestParams, any>
{
  constructor(private roleRepository: RoleRepository) {}
  execute(params: UpdateRoleRequestParams): Observable<any> {
    return this.roleRepository.update(params);
  }
}
