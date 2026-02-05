import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { MenuRepository } from 'src/app/domain/repositories/menu-repository';
import { LocalAuthenticatedUserRepository } from './local-authenticated-user-repository';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalMenuRepository implements MenuRepository {
  static items: Menu[] = [
    {
      name: $localize`:dashboard:Dashboard`,
      url: '',
      isShow: false,
      icon: 'dashboard',
      accessControlId: AccessControlId.ViewDashboard,
    },
    {
      name: $localize`:setting:Setting`,
      url: 'setting',
      isShow: false,
      icon: 'settings',
      childs: [
        {
          name: $localize`:users:Users`,
          url: 'users',
          accessControlId: AccessControlId.ViewUser,
        },
        {
          name: $localize`:accessControls:Access Controls`,
          url: 'access-controls',
          accessControlId: AccessControlId.ViewAccessControl,
        },
        {
          name: $localize`:roles:Roles`,
          url: 'roles',
          accessControlId: AccessControlId.ViewRole,
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
          let items = structuredClone(
            LocalMenuRepository.items.filter((item) => {
              const isShow =
                (item.accessControlId &&
                  user.hasAccessControl(item.accessControlId)) ||
                item.childs?.some(
                  (child) =>
                    child.accessControlId &&
                    user?.hasAccessControl(child.accessControlId),
                );
              return isShow;
            }),
          );
          items.forEach((menu) => {
            menu.childs = menu.childs?.filter(
              (child) =>
                child.accessControlId &&
                user?.hasAccessControl(child.accessControlId),
            );
          });
          observer.next({
            total: items.length,
            items: items,
          });
          observer.complete();
        });
      }),
    );
  }
}
