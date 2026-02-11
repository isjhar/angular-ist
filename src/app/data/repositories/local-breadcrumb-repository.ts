import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { Breadcrumb } from 'src/app/domain/entities/breadcrumb';
import { Error } from 'src/app/domain/entities/error';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { User } from 'src/app/domain/entities/user';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';
import { LocalAuthenticatedUserRepository } from './local-authenticated-user-repository';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalBreadcrumbRepository implements BreadcrumbRepository {
  static items: Breadcrumb[] = [
    {
      name: $localize`:home:Home`,
      url: '',
      childs: [
        {
          name: $localize`:setting:Setting`,
          url: 'setting',
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
              name: $localize`roles:Roles`,
              url: 'roles',
              accessControlId: AccessControlId.ViewRole,
              childs: [
                {
                  name: 'Role',
                  url: ':id',
                  accessControlId: AccessControlId.ViewRole,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  private _dynamicLabelDict = new BehaviorSubject<{ [key: string]: string }>(
    {},
  );

  get(params: PaginationParams): Observable<Pagination<Breadcrumb>> {
    let items = [...LocalBreadcrumbRepository.items];
    let search = params.search;
    let limit = params.limit ? params.limit : items.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      items = items.filter((element) => element.name.includes(search!));
    }
    let paginatedItems = items.splice(page * limit, limit);
    return of({ total: items.length, items: paginatedItems });
  }

  isUrlAccessible(url: string): Observable<boolean> {
    return this.findBreadcrumbByUrl(url).pipe(
      concatMap((menu) => {
        let localAuthenticatedUserRepository =
          new LocalAuthenticatedUserRepository();
        return localAuthenticatedUserRepository
          .getAuthenticatedUser()
          .pipe(
            map<User, boolean>(
              (user) =>
                (menu &&
                  menu.accessControlId &&
                  user.hasAccessControl(menu.accessControlId)) ??
                false,
            ),
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

  dynamicLabelDictChanges(): Observable<{ [key: string]: string }> {
    return this._dynamicLabelDict;
  }

  setDynamicLabelDict(data: { [key: string]: string }): void {
    const newValue: { [key: string]: string } = Object.assign(
      {},
      this._dynamicLabelDict.getValue(),
      data,
    );
    this._dynamicLabelDict.next(newValue);
  }
}
