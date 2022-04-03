import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DefaultTableModule } from 'src/app/shared/default-table/default-table.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DefaultFormModule } from 'src/app/shared/default-form/default-form.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UserComponent, AddUserDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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
export class UserModule {}
