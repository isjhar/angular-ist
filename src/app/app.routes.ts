import { AuthGuard } from './auth.guard';
import { Routes } from '@angular/router';
import { MainGuard } from './pages/main/main.guard';
import { mainRoutes } from './pages/main/main.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    canActivate: [AuthGuard],
    children: mainRoutes,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  { path: '**', redirectTo: '' },
];
