import { InjectionToken } from '@angular/core';
import { AccessControlRepository } from './domain/repositories/access-control-repository';
import { AuthRepository } from './domain/repositories/auth-repository';
import { RoleRepository } from './domain/repositories/role-repository';
import { UserRepository } from './domain/repositories/user-repository';
import { JobRepository } from './domain/repositories/job-repository';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('');
export const USER_REPOSITORY = new InjectionToken<UserRepository>('');
export const ROLE_REPOSITORY = new InjectionToken<RoleRepository>('');
export const ACCESS_CONTROL_REPOSITORY =
  new InjectionToken<AccessControlRepository>('');
export const JOB_REPOSITORY = new InjectionToken<JobRepository>('');
