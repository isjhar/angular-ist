import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthInterceptor } from './app-local-repository';

describe('AuthInterceptor', () => {
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [AuthInterceptor, { provide: Router, useValue: routerSpy }],
    })
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
