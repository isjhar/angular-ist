import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MainGuard } from './main.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'pendaftaran',
        loadChildren: () =>
          import('./pendaftaran/pendaftaran.module').then(
            (m) => m.PendaftaranModule
          ),
        canActivate: [MainGuard],
      },
      {
        path: 'pengaturan',
        loadChildren: () =>
          import('./pengaturan/pengaturan.module').then(
            (m) => m.PengaturanModule
          ),
        canActivate: [MainGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
