import { AuthGuard } from './auth.guard';
import { Routes } from '@angular/router';
import { mainRoutes } from './pages/main/main.routes';
import { localizationGuard } from 'src/app/localization.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    children: mainRoutes,
    canActivate: [localizationGuard, AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [localizationGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
    canActivate: [localizationGuard],
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent,
      ),
    canActivate: [localizationGuard],
  },
  {
    path: 'password-reset-sent',
    loadComponent: () =>
      import('./pages/password-reset-sent/password-reset-sent.component').then(
        (m) => m.PasswordResetSentComponent,
      ),
    canActivate: [localizationGuard],
  },
  { path: '**', redirectTo: '' },
];
