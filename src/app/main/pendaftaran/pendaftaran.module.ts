import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendaftaranRoutingModule } from './pendaftaran-routing.module';
import { PendaftaranComponent } from './pendaftaran.component';


@NgModule({
  declarations: [
    PendaftaranComponent
  ],
  imports: [
    CommonModule,
    PendaftaranRoutingModule
  ]
})
export class PendaftaranModule { }
