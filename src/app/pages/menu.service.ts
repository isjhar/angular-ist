import { Injectable } from '@angular/core';
import { AccessControlId } from '../domain/entities/access-control';

export interface Menu {
  name: string;
  url: string;
  isShow?: boolean;
  icon?: string;
  childs?: Menu[];
  accessControlId?: AccessControlId;
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menus: Menu[] = [
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

  constructor() {}

  findMenuByUrl(url: string): Menu | undefined {
    for (let index = 0; index < this.menus.length; index++) {
      const element = this.menus[index];
      var foundedMenu = this.findMenuOnRootByUrl(url, '', element);
      if (foundedMenu) {
        return foundedMenu;
      }
    }
    return undefined;
  }

  findMenuOnRootByUrl(
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
