import { TestBed } from '@angular/core/testing';

import { RoleTableService } from './role-table.service';

describe('RoleTableService', () => {
  let service: RoleTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
