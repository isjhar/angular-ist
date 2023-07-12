import { Error } from 'src/app/domain/entities/error';
import { LocalMenuRepository } from './local-menu-repository';

describe('ValueService', () => {
  let service: LocalMenuRepository;
  beforeEach(() => {
    service = new LocalMenuRepository();
  });

  it('#findMenuByUrl empty should return menu dashboard ', () => {
    service.findMenuByUrl('').subscribe(
      (menu) => {
        expect(menu.name).toBe('Dashboard');
      },
      (error) => {
        expect(error).toBe(Error.ItemNotFound);
      }
    );
  });

  it('#findMenuByUrl /setting should return menu setting ', () => {
    service.findMenuByUrl('/setting').subscribe(
      (menu) => {
        expect(menu.name).toBe('Setting');
      },
      (error) => {
        expect(error).toBe(Error.ItemNotFound);
      }
    );
  });

  it('#findMenuByUrl /setting/roles/100 should return menu role ', () => {
    service.findMenuByUrl('/setting/roles/100').subscribe(
      (menu) => {
        expect(menu.name).toBe('Role');
      },
      (error) => {
        expect(error).toBe(Error.ItemNotFound);
      }
    );
  });
});
