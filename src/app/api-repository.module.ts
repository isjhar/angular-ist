import { NgModule } from '@angular/core';
import { ApiAuthRepository } from './data/repositories/api-auth-repository';
import { ApiUserRepository } from './data/repositories/api-user-repository';
import { ApiRoleRepository } from './data/repositories/api-role-repository';
import { ApiAccessControlRepository } from './data/repositories/api-access-control-repository';
import {
  ACCESS_CONTROL_REPOSITORY,
  AUTH_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from './token-repository.module';

@NgModule({
  providers: [
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
  ],
})
export class ApiRepositoryModule {}
