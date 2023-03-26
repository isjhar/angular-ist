import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './role.guard';
import { SettingComponent } from './setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'roles/:id',
        loadChildren: () =>
          import('./role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'access-controls',
        loadChildren: () =>
          import('./access-controls/access-controls.module').then(
            (m) => m.AccessControlsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RoleGuard],
})
export class SettingRoutingModule {}
