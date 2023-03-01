import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './auth.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthRepository } from './domain/repositories/auth-repository';
import { MockAuthRepository } from './data/repositories/mock-auth-repository';
import { AuthenticatedUserRepository } from './domain/repositories/authenticated-user-repository';
import { LocalAuthenticatedUserRepository } from './data/repositories/local-authenticated-user-repository';
import { UserRepository } from './domain/repositories/user-repository';
import { MockUserRepository } from './data/repositories/mock-user-repository';
import { RoleRepository } from './domain/repositories/role-repository';
import { MockRoleRepository } from './data/repositories/mock-role-repository';
import { AccessControlRepository } from './domain/repositories/access-control-repository';
import { MockAccessControlRepository } from './data/repositories/mock-access-control.repository';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('');
export const AUTHENTICATED_USER_REPOSITORY =
  new InjectionToken<AuthenticatedUserRepository>('');
export const USER_REPOSITORY = new InjectionToken<UserRepository>('');
export const ROLE_REPOSITORY = new InjectionToken<RoleRepository>('');
export const ACCESS_CONTROL_REPOSITORY =
  new InjectionToken<AccessControlRepository>('');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  providers: [
    authInterceptorProviders,
    { provide: AUTH_REPOSITORY, useClass: MockAuthRepository },
    {
      provide: AUTHENTICATED_USER_REPOSITORY,
      useClass: LocalAuthenticatedUserRepository,
    },
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
  bootstrap: [AppComponent],
})
export class AppModule {}
