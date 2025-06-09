import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MainGuard } from './main.guard';
import { settingRoutes } from './setting/setting.routes';

export const mainRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'setting',
    loadComponent: () =>
      import('./setting/setting.component').then((m) => m.SettingComponent),
    children: settingRoutes,
    canActivate: [MainGuard],
  },
];
