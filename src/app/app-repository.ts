import { Provider } from '@angular/core';
import { appLocalRepositoryProviders } from './app-local-repository';
import { environment } from 'src/environments/environment';
import { appMockRepositoryProviders } from './app-mock-repository';
import { appApiRepositoryProviders } from './app-api-repository';

export function provideRepositories(): Provider {
  return [
    appLocalRepositoryProviders,
    environment.dataSource == 'mock'
      ? appMockRepositoryProviders
      : appApiRepositoryProviders,
  ];
}
