import { TestBed } from '@angular/core/testing';

import { MenusTableService } from './menus-table.service';

describe('MenusTableService', () => {
  let service: MenusTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenusTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
