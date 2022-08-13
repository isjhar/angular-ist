import { Observable, of } from 'rxjs';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import {
  MenuRepository,
  StoreMenuRequestParams,
} from 'src/app/domain/repositories/menu-repository';

export class MockMenuRepository extends MenuRepository {
  static menus: Menu[] = [
    {
      id: 1,
      name: 'Dashboard',
      url: '/',
    },
    {
      id: 2,
      name: 'Setting',
      url: '/setting',
    },
  ];

  get(params: PaginationParams): Observable<Pagination<Menu>> {
    let menus = MockMenuRepository.menus;
    let search = params.search;
    let limit = params.limit ? params.limit : menus.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      menus = menus.filter((element) => element.name.includes(search!));
    }
    menus = menus.splice(page * limit, limit);
    return of({ total: MockMenuRepository.menus.length, data: menus });
  }
  store(params: StoreMenuRequestParams): Observable<Menu> {
    return new Observable<Menu>((observer) => {
      let maxId = Math.max(
        ...MockMenuRepository.menus.map((element) => element.id)
      );
      let menu: Menu = {
        id: maxId + 1,
        name: params.name,
        url: params.url,
      };
      observer.next(menu);
      observer.complete();
    });
  }
  update(id: number, params: StoreMenuRequestParams): Observable<void> {
    return new Observable<any>((observer) => {
      let menu = MockMenuRepository.menus.find((element) => element.id == id);
      if (menu == undefined) {
        observer.error('menu not found');
      }
      menu!.name = params.name;
      menu!.url = params.url;

      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<void> {
    return new Observable<any>((observer) => {
      MockMenuRepository.menus = MockMenuRepository.menus.filter(
        (element) => element.id != id
      );
      observer.next();
      observer.complete();
    });
  }
}
