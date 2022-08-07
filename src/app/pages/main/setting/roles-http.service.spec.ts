import { TestBed } from '@angular/core/testing';

import { RolesHttpService } from './roles-http.service';

describe('RolesHttpService', () => {
  let service: RolesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
