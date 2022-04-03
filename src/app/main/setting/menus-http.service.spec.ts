import { TestBed } from '@angular/core/testing';

import { MenusHttpService } from './menus-http.service';

describe('MenusHttpService', () => {
  let service: MenusHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenusHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
