import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MainGuard } from './main.guard';

export const mainRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./setting/setting.component').then((m) => m.SettingComponent),
    canActivate: [MainGuard],
  },
];
