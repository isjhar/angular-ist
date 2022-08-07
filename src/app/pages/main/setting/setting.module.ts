import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { ConfirmDialogModule } from 'src/app/pages/shared/confirm-dialog/confirm-dialog.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatSnackBarModule,
    ConfirmDialogModule,
  ],
})
export class SettingModule {}
