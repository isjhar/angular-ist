import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MainGuard } from './main.guard';

describe('MainGuard', () => {
  let guard: MainGuard;
  let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: Router, useValue: routerSpy }],
    });
    guard = TestBed.inject(MainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
