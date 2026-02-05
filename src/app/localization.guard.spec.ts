import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { localizationGuard } from './localization.guard';

describe('localizationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => localizationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
