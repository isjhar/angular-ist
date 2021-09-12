import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendaftaranComponent } from './pendaftaran.component';

const routes: Routes = [{ path: '', component: PendaftaranComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendaftaranRoutingModule { }
