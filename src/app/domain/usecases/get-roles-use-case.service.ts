import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { Role } from '../entities/role';
import { RoleRepository } from '../repositories/role-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetRolesUseCaseService
  implements UseCase<PaginationParams, Pagination<Role>>
{
  constructor(private roleRepository: RoleRepository) {}
  execute(params: PaginationParams): Observable<Pagination<Role>> {
    return this.roleRepository.get(params);
  }
}
