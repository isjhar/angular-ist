import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessControlRoutingModule } from './access-control-routing.module';
import { AccessControlComponent } from './access-control.component';


@NgModule({
  declarations: [
    AccessControlComponent
  ],
  imports: [
    CommonModule,
    AccessControlRoutingModule
  ]
})
export class AccessControlModule { }
