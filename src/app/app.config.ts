import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
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
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRepositories(),
    provideMomentDateAdapter(),
    provideCharts(withDefaultRegisterables()),
    authInterceptorProviders,
    apiInterceptorProviders,
    provideRouter(routes),
  ],
};
