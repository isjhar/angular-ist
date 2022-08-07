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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
