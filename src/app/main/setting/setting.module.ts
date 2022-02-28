import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { UserComponent } from './user/user.component';
import { AddDialogComponent } from './user/add-dialog/add-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DefaultTableModule } from 'src/app/shared/default-table/default-table.module';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogModule } from 'src/app/shared/confirm-dialog/confirm-dialog.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DefaultFormModule } from 'src/app/shared/default-form/default-form.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SettingComponent, UserComponent, AddDialogComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DefaultTableModule,
    DefaultFormModule,
    ConfirmDialogModule,
  ],
})
export class SettingModule {}
