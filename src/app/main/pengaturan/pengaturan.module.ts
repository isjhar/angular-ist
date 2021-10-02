import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PengaturanRoutingModule } from './pengaturan-routing.module';
import { PengaturanComponent } from './pengaturan.component';


@NgModule({
  declarations: [
    PengaturanComponent
  ],
  imports: [
    CommonModule,
    PengaturanRoutingModule
  ]
})
export class PengaturanModule { }
