import { LocalMenuRepository } from './local-menu-repository';

describe('ValueService', () => {
  let service: LocalMenuRepository;
  beforeEach(() => {
    service = new LocalMenuRepository();
  });

  it('#findMenuByUrl empty should return menu dashboard ', () => {
    service.findMenuByUrl('').subscribe((menu) => {
      expect(menu).toBeDefined();

      expect(menu!.name).toBe('Dashboard');
    });
  });

  it('#findMenuByUrl /setting should return menu setting ', () => {
    service.findMenuByUrl('/setting').subscribe((menu) => {
      expect(menu).toBeDefined();

      expect(menu!.name).toBe('Setting');
    });
  });

  it('#findMenuByUrl /setting/roles/100 should return menu role ', () => {
    service.findMenuByUrl('/setting/roles/100').subscribe((menu) => {
      expect(menu).toBeDefined();

      expect(menu!.name).toBe('Role');
    });
  });
});
