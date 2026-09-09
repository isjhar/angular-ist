import { AuthGuard } from './auth.guard';
import { SetupGuard } from './setup.guard';
import { Routes } from '@angular/router';
import { mainRoutes } from './pages/main/main.routes';
import { localizationGuard } from 'src/app/localization.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
    children: mainRoutes,
    canActivate: [SetupGuard, localizationGuard, AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [SetupGuard, localizationGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
    canActivate: [SetupGuard, localizationGuard],
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent,
      ),
    canActivate: [SetupGuard, localizationGuard],
  },
  {
    path: 'password-reset-sent',
    loadComponent: () =>
      import('./pages/password-reset-sent/password-reset-sent.component').then(
        (m) => m.PasswordResetSentComponent,
      ),
    canActivate: [SetupGuard, localizationGuard],
  },
  {
    path: 'setup',
    loadComponent: () =>
      import('./pages/setup/setup.component').then((m) => m.SetupComponent),
  },
  { path: '**', redirectTo: '' },
];
