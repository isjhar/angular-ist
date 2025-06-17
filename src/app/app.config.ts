import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  Provider,
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
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { enUS } from 'date-fns/locale';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRepositories(),
    provideDateAdapter(),
    provideCharts(withDefaultRegisterables()),
    authInterceptorProviders,
    apiInterceptorProviders,
    provideRouter(routes),
  ],
};

function provideDateAdapter(): Provider[] {
  return [
    provideDateFnsAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: enUS },
  ];
}
