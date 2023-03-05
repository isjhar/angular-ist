import { Observable, of } from 'rxjs';
import { Breadcrumb } from 'src/app/domain/entities/breadcrumb';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';

export class LocalBreadcrumbRepository implements BreadcrumbRepository {
  static items: Breadcrumb[] = [
    {
      name: 'Home',
      url: '',
      childs: [
        {
          name: 'Setting',
          url: 'setting',
          childs: [
            {
              name: 'Users',
              url: 'users',
            },
            {
              name: 'Access Controls',
              url: 'access-controls',
            },
            {
              name: 'Roles',
              url: 'roles',
              childs: [
                {
                  name: 'Role',
                  url: ':id',
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  get(params: PaginationParams): Observable<Pagination<Breadcrumb>> {
    let items = [...LocalBreadcrumbRepository.items];
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
