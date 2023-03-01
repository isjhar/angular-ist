import { MenuService } from './menu.service';

describe('ValueService', () => {
  let service: MenuService;
  beforeEach(() => {
    service = new MenuService();
  });

  it('#findMenuByUrl empty should return menu dashboard ', () => {
    let menu = service.findMenuByUrl('');
    expect(menu).toBeDefined();

    expect(menu!.name).toBe('Dashboard');
  });

  it('#findMenuByUrl /setting should return menu setting ', () => {
    let menu = service.findMenuByUrl('/setting');
    expect(menu).toBeDefined();

    expect(menu!.name).toBe('Setting');
  });

  it('#findMenuByUrl /setting/roles/100 should return menu role ', () => {
    let menu = service.findMenuByUrl('/setting/roles/100');
    expect(menu).toBeDefined();

    expect(menu!.name).toBe('Role');
  });
});
