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
import { provideRepositories } from './app-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRepositories(),
    authInterceptorProviders,
    apiInterceptorProviders,
    provideRouter(routes),
  ],
};
