import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { User } from 'src/app/domain/entities/user';
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
  ];

  get(params: PaginationParams): Observable<Pagination<Menu>> {
    let localAuthenticatedUserRepository =
      new LocalAuthenticatedUserRepository();
    return localAuthenticatedUserRepository.getAuthenticatedUser().pipe(
      concatMap((user) => {
        return new Observable<Pagination<Menu>>((observer) => {
          let items = LocalMenuRepository.items;
          items.forEach((x) => {
            let isShow = true;
            if (
              x.accessControlId &&
              !user?.hasAccessControl(x.accessControlId)
            ) {
              isShow = false;
              return;
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

  isUrlAccessible(url: string): Observable<boolean> {
    return this.findMenuByUrl(url).pipe(
      concatMap((menu) => {
        let localAuthenticatedUserRepository =
          new LocalAuthenticatedUserRepository();
        return localAuthenticatedUserRepository.getAuthenticatedUser().pipe(
          map<User, boolean>((user) => {
            if (menu && menu.accessControlId) {
              return user.hasAccessControl(menu.accessControlId);
            }
            return false;
          })
        );
      })
    );
  }

  findMenuByUrl(url: string): Observable<Menu | undefined> {
    return new Observable<Menu | undefined>((observer) => {
      let menus = LocalMenuRepository.items;
      for (let index = 0; index < menus.length; index++) {
        const element = menus[index];
        var foundedMenu = this.findMenuOnRootByUrl(url, '', element);
        if (foundedMenu) {
          observer.next(foundedMenu);
          observer.complete();
          return;
        }
      }
      observer.next(undefined);
      observer.complete();
      return;
    });
  }

  private findMenuOnRootByUrl(
    url: string,
    rootUrl: string,
    root: Menu
  ): Menu | undefined {
    if (url == '') {
      if (url == rootUrl) {
        return root;
      }
      return undefined;
    }
    rootUrl += '/';
    if (root.url.includes(':')) {
      rootUrl += '[^/]+';
    } else {
      rootUrl += root.url;
    }
    let regex = '^' + rootUrl + '$';
    if (url.match(regex)) {
      return root;
    }
    let childs = root.childs;
    if (childs) {
      for (let index = 0; index < childs.length; index++) {
        const child = childs[index];
        let menu = this.findMenuOnRootByUrl(url, rootUrl, child);
        if (menu) {
          return menu;
        }
      }
    }
    return undefined;
  }
}
