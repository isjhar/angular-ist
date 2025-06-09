import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptorProviders } from './auth.interceptor';
import { apiInterceptorProviders } from './api.interceptor';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { appLocalRepositoryProviders } from './app-local-repository.module';
import { environment } from 'src/environments/environment';
import { appMockRepositoryProviders } from './app-mock-repository.module';
import { appApiRepositoryProviders } from './app-api-repository.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    appLocalRepositoryProviders,
    environment.dataSource == 'mock'
      ? appMockRepositoryProviders
      : appApiRepositoryProviders,
    authInterceptorProviders,
    apiInterceptorProviders,
    provideRouter(routes),
  ],
};
