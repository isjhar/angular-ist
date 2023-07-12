import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { Error } from 'src/app/domain/entities/error';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { MenuRepository } from 'src/app/domain/repositories/menu-repository';
import { LocalAuthenticatedUserRepository } from './local-authenticated-user-repository';

export class LocalMenuRepository implements MenuRepository {
  static items: Menu[] = [
    {
      name: 'Dashboard',
      url: '',
      isShow: false,
      icon: 'dashboard',
    },
    {
      name: 'Setting',
      url: 'setting',
      isShow: false,
      icon: 'settings',
      accessControlId: AccessControlId.Setting,
      childs: [
        {
          name: 'Users',
          url: 'users',
          accessControlId: AccessControlId.Setting,
        },
        {
          name: 'Access Controls',
          url: 'access-controls',
          accessControlId: AccessControlId.Setting,
        },
        {
          name: 'Roles',
          url: 'roles',
          accessControlId: AccessControlId.Setting,
        },
      ],
    },
  ];

  get(params: PaginationParams): Observable<Pagination<Menu>> {
    let localAuthenticatedUserRepository =
      new LocalAuthenticatedUserRepository();
    return localAuthenticatedUserRepository.getAuthenticatedUser().pipe(
      concatMap((user) => {
        return new Observable<Pagination<Menu>>((observer) => {
          let items = LocalMenuRepository.items;
          items.forEach((x) => {
            let isShow = false;
            if (
              !x.accessControlId ||
              (x.accessControlId && user?.hasAccessControl(x.accessControlId))
            ) {
              isShow = true;
            }
            x.isShow = isShow;
          });
          observer.next({
            total: items.length,
            data: items,
          });
          observer.complete();
        });
      })
    );
  }
}
