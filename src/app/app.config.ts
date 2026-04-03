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
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRepositories } from './app-repository';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { enUS } from 'date-fns/locale';
import { DATE_FORMATS } from 'src/app/date-formats';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
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
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: DATE_FORMATS.date,
          timeInput: DATE_FORMATS.time,
        },
        display: {
          dateInput: DATE_FORMATS.date,
          monthLabel: 'MMM yyyy',
          dateA11yLabel: 'PP',
          monthYearA11yLabel: 'MMMM yyyy',
          monthYearLabel: 'MMM yyyy',
          timeInput: DATE_FORMATS.time,
          timeOptionLabel: DATE_FORMATS.time,
        },
      },
    },
  ];
}
