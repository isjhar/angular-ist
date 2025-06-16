import { NgModule, Provider } from '@angular/core';
import { MockAccessControlRepository } from './data/repositories/mock-access-control.repository';
import { MockAuthRepository } from './data/repositories/mock-auth-repository';
import { MockRoleRepository } from './data/repositories/mock-role-repository';
import { MockUserRepository } from './data/repositories/mock-user-repository';
import {
  ACCESS_CONTROL_REPOSITORY,
  ADMIN_DASHBOARD_REPOSITORY,
  AUTH_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from './app-token-repository';
import { MockAdminDashboardRepository } from 'src/app/data/repositories/mock-admin-dashboard-repository';

export const appMockRepositoryProviders: Provider = [
  { provide: AUTH_REPOSITORY, useClass: MockAuthRepository },
  {
    provide: USER_REPOSITORY,
    useClass: MockUserRepository,
  },
  {
    provide: ROLE_REPOSITORY,
    useClass: MockRoleRepository,
  },
  {
    provide: ACCESS_CONTROL_REPOSITORY,
    useClass: MockAccessControlRepository,
  },
  {
    provide: ADMIN_DASHBOARD_REPOSITORY,
    useClass: MockAdminDashboardRepository,
  },
];
