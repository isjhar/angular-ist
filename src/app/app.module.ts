import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptorProviders } from './auth.interceptor';
import { AppLocalRepositoryModule } from './app-local-repository.module';
import { AppMockRepositoryModule } from './app-mock-repository.module';
import { AppApiRepositoryModule } from './app-api-repository.module';
import { apiInterceptorProviders } from './api.interceptor';
import { environment } from 'src/environments/environment';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppLocalRepositoryModule,
        ...(environment.dataSource == 'mock'
            ? [AppMockRepositoryModule]
            : [AppApiRepositoryModule])], providers: [apiInterceptorProviders, authInterceptorProviders, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
