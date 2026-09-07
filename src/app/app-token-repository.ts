import { InjectionToken } from '@angular/core';
import { AccessControlRepository } from './domain/repositories/access-control-repository';
import { AuthRepository } from './domain/repositories/auth-repository';
import { RoleRepository } from './domain/repositories/role-repository';
import { UserRepository } from './domain/repositories/user-repository';
import { AdminDashboardRepository } from 'src/app/domain/repositories/admin-dashboard-repository';
import { PasswordResetRepository } from 'src/app/domain/repositories/password-reset-repository';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('');
export const USER_REPOSITORY = new InjectionToken<UserRepository>('');
export const ROLE_REPOSITORY = new InjectionToken<RoleRepository>('');
export const ACCESS_CONTROL_REPOSITORY =
  new InjectionToken<AccessControlRepository>('');
export const ADMIN_DASHBOARD_REPOSITORY =
  new InjectionToken<AdminDashboardRepository>('');

export const PASSWORD_RESET_REPOSITORY =
  new InjectionToken<PasswordResetRepository>('');
