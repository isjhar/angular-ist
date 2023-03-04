import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE_REPOSITORY } from 'src/app/app.module';
import { FindUseCase } from 'src/app/domain/base-use-cases/find-use-case';
import { Role } from 'src/app/domain/entities/role';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { BaseDetailGuardGuard } from '../../shared/base-detail-guard.guard';

@Injectable()
export class RoleGuard extends BaseDetailGuardGuard<Role> {
  findUseCase: FindUseCase<Role>;
  constructor(
    protected router: Router,
    @Inject(ROLE_REPOSITORY) roleRepository: RoleRepository
  ) {
    super(router);
    this.findUseCase = new FindUseCase<Role>(roleRepository);
  }
}
