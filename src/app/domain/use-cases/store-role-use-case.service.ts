import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Role } from '../entities/role';
import {
  RoleRepository,
  StoreRoleRequestParams,
} from '../repositories/role-repository';
import { UseCase } from './use-case';

export class StoreRoleUseCaseService
  implements UseCase<StoreRoleUseCaseParams, StoreRoleUseCaseResponse>
{
  constructor(private roleRepository: RoleRepository) {}
  execute(
    params: StoreRoleUseCaseParams
  ): Observable<StoreRoleUseCaseResponse> {
    return this.roleRepository.store(params).pipe(
      map<Role, StoreRoleUseCaseResponse>((response) => {
        return {
          role: response,
        };
      })
    );
  }
}

export interface StoreRoleUseCaseParams {
  name: string;
  menus: number[];
}

export interface StoreRoleUseCaseResponse {
  role: Role;
}
