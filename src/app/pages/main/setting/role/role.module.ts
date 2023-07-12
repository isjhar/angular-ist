import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DefaultTableModule } from 'src/app/pages/shared/default-table/default-table.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [RoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    DefaultTableModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
})
export class RoleModule {}
