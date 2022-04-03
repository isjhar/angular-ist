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
      name: 'Pendaftaran',
      url: 'pendaftaran',
      isShow: false,
      icon: 'app_registration',
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
          name: 'Roles',
          url: 'roles',
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
