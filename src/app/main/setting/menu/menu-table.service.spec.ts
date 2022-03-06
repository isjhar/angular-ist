import { TestBed } from '@angular/core/testing';

import { MenuTableService } from './menu-table.service';

describe('MenuTableService', () => {
  let service: MenuTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
