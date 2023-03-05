import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DashboardComponent, AdminComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    MatCardModule,
  ],
})
export class DashboardModule {}
