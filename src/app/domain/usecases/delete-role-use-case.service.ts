import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleRepository } from '../repositories/role-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class DeleteRoleUseCaseService implements UseCase<number, any> {
  constructor(private roleRepository: RoleRepository) {}
  execute(params: number): Observable<any> {
    return this.roleRepository.delete(params);
  }
}
