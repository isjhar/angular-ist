import { Routes } from '@angular/router';
import { SettingComponent } from './setting.component';

export const settingRoutes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'roles/:id',
        loadComponent: () =>
          import('./role/role.component').then((m) => m.RoleComponent),
      },
      {
        path: 'roles',
        loadComponent: () =>
          import('./roles/roles.component').then((m) => m.RolesComponent),
      },
      {
        path: 'access-controls',
        loadComponent: () =>
          import('./access-controls/access-controls.component').then(
            (m) => m.AccessControlsComponent
          ),
      },
    ],
  },
];
