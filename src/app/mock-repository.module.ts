import { NgModule } from '@angular/core';
import { MockAccessControlRepository } from './data/repositories/mock-access-control.repository';
import { MockAuthRepository } from './data/repositories/mock-auth-repository';
import { MockRoleRepository } from './data/repositories/mock-role-repository';
import { MockUserRepository } from './data/repositories/mock-user-repository';
import {
  ACCESS_CONTROL_REPOSITORY,
  AUTH_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from './token-repository.module';

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
