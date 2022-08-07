import { Observable, of } from 'rxjs';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import {
  MenuRepository,
  StoreMenuRequestParams,
  UpdateMenuRequestParams,
} from 'src/app/domain/repositories/menu-repository';

export class MockMenuRepositoryService extends MenuRepository {
  menus: Menu[] = [
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
    let menus = this.menus;
    let search = params.search;
    let limit = params.limit ? params.limit : menus.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      menus = menus.filter((element) => element.name.includes(search!));
    }
    menus = menus.splice(page * limit, limit);
    return of({ total: this.menus.length, data: menus });
  }
  store(params: StoreMenuRequestParams): Observable<Menu> {
    return new Observable<Menu>((observer) => {
      let maxId = Math.max(...this.menus.map((element) => element.id));
      let menu: Menu = {
        id: maxId + 1,
        name: params.name,
        url: params.url,
      };
      observer.next(menu);
      observer.complete();
    });
  }
  update(params: UpdateMenuRequestParams): Observable<any> {
    return new Observable<any>((observer) => {
      let menu = this.menus.find((element) => element.id == params.id);
      if (menu == undefined) {
        observer.error({ error: 'menu not found' });
      }
      menu!.name = params.name;
      menu!.url = params.url;

      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.menus = this.menus.filter((element) => element.id != id);
      observer.next();
      observer.complete();
    });
  }
}
