import { Injectable } from '@angular/core';

export interface Menu {
  name: string;
  url: string;
  isShow: boolean;
  icon: string;
  childs?: MenuChild[];
}

interface MenuChild {
  name: string;
  url: string;
  childs?: MenuChild[];
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
        {
          name: 'Menus',
          url: 'menus',
        },
      ],
    },
  ];

  constructor() {}
}
