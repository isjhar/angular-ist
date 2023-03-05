import { Observable, of } from 'rxjs';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { BreadcrumbMenuRepository } from 'src/app/domain/repositories/breadcrumb-menu-repository';

export class LocalBreadcrumbMenuRepository implements BreadcrumbMenuRepository {
  static items: Menu[] = [
    {
      name: 'Home',
      url: '',
      isShow: false,
      icon: 'dashboard',
      childs: [
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
              childs: [
                {
                  name: 'Role',
                  url: ':id',
                  accessControlId: AccessControlId.Setting,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  get(params: PaginationParams): Observable<Pagination<Menu>> {
    let items = [...LocalBreadcrumbMenuRepository.items];
    let search = params.search;
    let limit = params.limit ? params.limit : items.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      items = items.filter((element) => element.name.includes(search!));
    }
    let paginatedItems = items.splice((page - 1) * limit, limit);
    return of({ total: items.length, data: paginatedItems });
  }
}
