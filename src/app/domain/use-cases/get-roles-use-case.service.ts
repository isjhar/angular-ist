import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROLE_REPOSITORY } from 'src/app/app.module';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { Role } from '../entities/role';
import { RoleRepository } from '../repositories/role-repository';
import { GetUseCaseParams, UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetRolesUseCaseService
  implements UseCase<GetUseCaseParams, GetRoleUseCaseResponse>
{
  constructor(
    @Inject(ROLE_REPOSITORY) private roleRepository: RoleRepository
  ) {}
  execute(params: GetUseCaseParams): Observable<GetRoleUseCaseResponse> {
    return this.roleRepository.get(params).pipe(
      map<Pagination<Role>, GetRoleUseCaseResponse>((element) => {
        return {
          pagination: element,
        };
      })
    );
  }
}

export interface GetRoleUseCaseResponse {
  pagination: Pagination<Role>;
}
