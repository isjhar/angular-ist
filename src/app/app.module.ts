import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, authInterceptorProviders } from './auth.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthRepository } from './domain/repositories/auth-repository';
import { MockAuthRepository } from './data/repositories/mock-auth-repository';
import { AuthenticatedUserRepository } from './domain/repositories/authenticated-user-repository';
import { LocalAuthenticatedUserRepository } from './data/repositories/local-authenticated-user-repository';
import { UserRepository } from './domain/repositories/user-repository';
import { MockUserRepository } from './data/repositories/mock-user-repository';
import { RoleRepository } from './domain/repositories/role-repository';
import { MockRoleRepository } from './data/repositories/mock-role-repository';
import { MenuRepository } from './domain/repositories/menu-repository';
import { MockMenuRepository } from './data/repositories/mock-menu-repository';

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
    { provide: AuthRepository, useClass: MockAuthRepository },
    {
      provide: AuthenticatedUserRepository,
      useClass: LocalAuthenticatedUserRepository,
    },
    {
      provide: UserRepository,
      useClass: MockUserRepository,
    },
    {
      provide: RoleRepository,
      useClass: MockRoleRepository,
    },
    {
      provide: MenuRepository,
      useClass: MockMenuRepository,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
