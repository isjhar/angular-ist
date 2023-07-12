import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROLE_REPOSITORY } from 'src/app/app-token-repository.module';
import { Role } from 'src/app/domain/entities/role';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { BaseDetailGuardGuard } from '../../shared/base-detail-guard.guard';

@Injectable()
export class RoleGuard extends BaseDetailGuardGuard<Role> {
  constructor(
    router: Router,
    @Inject(ROLE_REPOSITORY) roleRepository: RoleRepository
  ) {
    super(router, roleRepository);
  }
}
