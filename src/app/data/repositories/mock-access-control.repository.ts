import { Observable, of } from 'rxjs';
import {
  AccessControl,
  AccessControlId,
} from 'src/app/domain/entities/access-control';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import {
  AccessControlRepository,
  StoreAccessControlRequestParams,
} from 'src/app/domain/repositories/access-control-repository';

export class MockAccessControlRepository implements AccessControlRepository {
  static items: AccessControl[] = [
    {
      id: AccessControlId.ViewDashboard,
      name: 'Dashboard',
      description: 'View dashboard',
    },
    {
      id: AccessControlId.ViewUser,
      name: 'Setting',
      description: 'View setting',
    },
  ];

  get(params: PaginationParams): Observable<Pagination<AccessControl>> {
    let items = [...MockAccessControlRepository.items];
    let search = params.search;
    let limit = params.limit ? params.limit : items.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      items = items.filter((element) => element.name.includes(search!));
    }
    let paginatedAccessControls = items.splice(page * limit, limit);
    return of({
      total: paginatedAccessControls.length,
      items: paginatedAccessControls,
    });
  }
  store(params: StoreAccessControlRequestParams): Observable<AccessControl> {
    return new Observable<AccessControl>((observer) => {
      let maxId = Math.max(
        ...MockAccessControlRepository.items.map((element) => element.id),
      );
      let menu: AccessControl = {
        id: maxId + 1,
        name: params.name,
        description: params.description,
      };
      MockAccessControlRepository.items.push(menu);
      observer.next(menu);
      observer.complete();
    });
  }
  update(
    id: number,
    params: StoreAccessControlRequestParams,
  ): Observable<void> {
    return new Observable<void>((observer) => {
      let menu = MockAccessControlRepository.items.find(
        (element) => element.id == id,
      );
      if (menu == undefined) {
        observer.error('menu not found');
      }
      menu!.name = params.name;
      menu!.description = params.description;

      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      MockAccessControlRepository.items =
        MockAccessControlRepository.items.filter((element) => element.id != id);
      observer.next();
      observer.complete();
    });
  }
}
