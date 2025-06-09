import { AuthGuard } from './auth.guard';
import { Routes } from '@angular/router';
import { mainRoutes } from './pages/main/main.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    children: mainRoutes,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: '' },
];
