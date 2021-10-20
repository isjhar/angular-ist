import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PengaturanComponent } from './pengaturan.component';
import { UserService } from './user.service';

const routes: Routes = [{ path: '', component: PengaturanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService],
})
export class PengaturanRoutingModule {}
