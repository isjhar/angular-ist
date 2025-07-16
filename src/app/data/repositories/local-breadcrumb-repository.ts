import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { Breadcrumb } from 'src/app/domain/entities/breadcrumb';
import { Error } from 'src/app/domain/entities/error';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { User } from 'src/app/domain/entities/user';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';
import { LocalAuthenticatedUserRepository } from './local-authenticated-user-repository';

export class LocalBreadcrumbRepository implements BreadcrumbRepository {
  static items: Breadcrumb[] = [
    {
      name: 'Home',
      url: '',
      childs: [
        {
          name: 'Setting',
          url: 'setting',
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

  get(params: PaginationParams): Observable<Pagination<Breadcrumb>> {
    let items = [...LocalBreadcrumbRepository.items];
    let search = params.search;
    let limit = params.limit ? params.limit : items.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      items = items.filter((element) => element.name.includes(search!));
    }
    let paginatedItems = items.splice((page - 1) * limit, limit);
    return of({ total: items.length, items: paginatedItems });
  }

  isUrlAccessible(url: string): Observable<boolean> {
    return this.findBreadcrumbByUrl(url).pipe(
      concatMap((menu) => {
        let localAuthenticatedUserRepository =
          new LocalAuthenticatedUserRepository();
        return localAuthenticatedUserRepository.getAuthenticatedUser().pipe(
          map<User, boolean>((user) => {
            if (menu && menu.accessControlId) {
              return user.hasAccessControl(menu.accessControlId);
            }
            return false;
          }),
        );
      }),
    );
  }

  findBreadcrumbByUrl(url: string): Observable<Breadcrumb> {
    return new Observable<Breadcrumb>((observer) => {
      let menus = LocalBreadcrumbRepository.items;
      for (let index = 0; index < menus.length; index++) {
        const element = menus[index];
        var foundedBreadcrumb = this.findBreadcrumbOnRootByUrl(
          url,
          '',
          element,
        );
        if (foundedBreadcrumb) {
          observer.next(foundedBreadcrumb);
          observer.complete();
          return;
        }
      }
      observer.error(Error.ItemNotFound);
      observer.complete();
      return;
    });
  }

  private findBreadcrumbOnRootByUrl(
    url: string,
    rootUrl: string,
    root: Breadcrumb,
  ): Breadcrumb | undefined {
    if (url == '') {
      if (url == rootUrl) {
        return root;
      }
      return undefined;
    }
    rootUrl += '';
    if (root.url.includes(':')) {
      rootUrl += '/[^/]+';
    } else if (root.url != '') {
      rootUrl += '/' + root.url;
    }
    let regex = '^' + rootUrl + '$';
    if (url.match(regex)) {
      return root;
    }
    let childs = root.childs;
    if (childs) {
      for (let index = 0; index < childs.length; index++) {
        const child = childs[index];
        let menu = this.findBreadcrumbOnRootByUrl(url, rootUrl, child);
        if (menu) {
          return menu;
        }
      }
    }
    return undefined;
  }
}
