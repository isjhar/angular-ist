import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessControlsRoutingModule } from './access-controls-routing.module';
import { AccessControlsComponent } from './access-controls.component';
import { MatIconModule } from '@angular/material/icon';
import { DefaultTableModule } from 'src/app/pages/shared/default-table/default-table.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultFormModule } from 'src/app/pages/shared/default-form/default-form.module';

@NgModule({
  declarations: [AccessControlsComponent, AddDialogComponent],
  imports: [
    CommonModule,
    AccessControlsRoutingModule,
    DefaultTableModule,
    DefaultFormModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AccessControlsModule {}
