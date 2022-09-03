import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROLE_REPOSITORY } from 'src/app/app.module';
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
  implements UseCase<StoreRoleUseCaseParams, StoreRoleUseCaseResponse>
{
  constructor(
    @Inject(ROLE_REPOSITORY) private roleRepository: RoleRepository
  ) {}
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
