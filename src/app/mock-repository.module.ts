import { InjectionToken, NgModule } from '@angular/core';
import { MockAccessControlRepository } from './data/repositories/mock-access-control.repository';
import { MockAuthRepository } from './data/repositories/mock-auth-repository';
import { MockRoleRepository } from './data/repositories/mock-role-repository';
import { MockUserRepository } from './data/repositories/mock-user-repository';
import { AccessControlRepository } from './domain/repositories/access-control-repository';
import { AuthRepository } from './domain/repositories/auth-repository';
import { RoleRepository } from './domain/repositories/role-repository';
import { UserRepository } from './domain/repositories/user-repository';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('');
export const USER_REPOSITORY = new InjectionToken<UserRepository>('');
export const ROLE_REPOSITORY = new InjectionToken<RoleRepository>('');
export const ACCESS_CONTROL_REPOSITORY =
  new InjectionToken<AccessControlRepository>('');

@NgModule({
  providers: [
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
  ],
})
export class MockRepositoryModule {}
