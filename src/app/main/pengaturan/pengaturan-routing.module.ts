import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PengaturanComponent } from './pengaturan.component';

const routes: Routes = [{ path: '', component: PengaturanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengaturanRoutingModule { }
