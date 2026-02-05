import { InjectionToken, Provider } from '@angular/core';
import { LocalAuthenticatedUserRepository } from './data/repositories/local-authenticated-user-repository';
import { LocalBreadcrumbRepository } from './data/repositories/local-breadcrumb-repository';
import { LocalMenuRepository } from './data/repositories/local-menu-repository';
import { AuthenticatedUserRepository } from './domain/repositories/authenticated-user-repository';
import { BreadcrumbRepository } from './domain/repositories/breadcrumb-repository';
import { MenuRepository } from './domain/repositories/menu-repository';
import { LocalizationRepository } from 'src/app/domain/repositories/localization-repository';
import { LocalLocalizationRepository } from 'src/app/data/repositories/local-localization-repository';

export const AUTHENTICATED_USER_REPOSITORY =
  new InjectionToken<AuthenticatedUserRepository>('');
export const MENU_REPOSITORY = new InjectionToken<MenuRepository>('');
export const BREADCRUMB_REPOSITORY = new InjectionToken<BreadcrumbRepository>(
  '',
);
export const LOCALIZATION_REPOSITORY =
  new InjectionToken<LocalizationRepository>('');

export const appLocalRepositoryProviders: Provider = [
  {
    provide: AUTHENTICATED_USER_REPOSITORY,
    useClass: LocalAuthenticatedUserRepository,
  },
  {
    provide: MENU_REPOSITORY,
    useClass: LocalMenuRepository,
  },
  {
    provide: BREADCRUMB_REPOSITORY,
    useClass: LocalBreadcrumbRepository,
  },
  {
    provide: LOCALIZATION_REPOSITORY,
    useClass: LocalLocalizationRepository,
  },
];
