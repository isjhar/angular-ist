import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { SkeletonModule } from '../../shared/skeleton/skeleton.module';
import { TextModule } from '../../shared/text/text.module';

@NgModule({
  declarations: [DashboardComponent, AdminComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    SkeletonModule,
    TextModule,
  ],
})
export class DashboardModule {}
