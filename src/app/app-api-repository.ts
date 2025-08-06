import { NgModule, Provider } from '@angular/core';
import { ApiAuthRepository } from './data/repositories/api-auth-repository';
import { ApiUserRepository } from './data/repositories/api-user-repository';
import { ApiRoleRepository } from './data/repositories/api-role-repository';
import { ApiAccessControlRepository } from './data/repositories/api-access-control-repository';
import {
  ACCESS_CONTROL_REPOSITORY,
  ADMIN_DASHBOARD_REPOSITORY,
  AUTH_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from './app-token-repository';
import { MockAdminDashboardRepository } from 'src/app/data/repositories/mock-admin-dashboard-repository';

export const appApiRepositoryProviders: Provider = [
  { provide: AUTH_REPOSITORY, useClass: ApiAuthRepository },
  {
    provide: USER_REPOSITORY,
    useClass: ApiUserRepository,
  },
  {
    provide: ROLE_REPOSITORY,
    useClass: ApiRoleRepository,
  },
  {
    provide: ACCESS_CONTROL_REPOSITORY,
    useClass: ApiAccessControlRepository,
  },
  {
    provide: ADMIN_DASHBOARD_REPOSITORY,
    useClass: MockAdminDashboardRepository,
  },
];
