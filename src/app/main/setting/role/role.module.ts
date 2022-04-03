import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { AddRoleDialogComponent } from './add-role-dialog/add-role-dialog.component';
import { DefaultTableModule } from 'src/app/shared/default-table/default-table.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultFormModule } from 'src/app/shared/default-form/default-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [RoleComponent, AddRoleDialogComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    DefaultTableModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    DefaultFormModule,
    MatChipsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
  ],
})
export class RoleModule {}
