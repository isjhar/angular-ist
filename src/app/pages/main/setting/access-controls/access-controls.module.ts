import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessControlsRoutingModule } from './access-controls-routing.module';
import { AccessControlsComponent } from './access-controls.component';
import { MatIconModule } from '@angular/material/icon';
import { DefaultTableModule } from 'src/app/pages/shared/default-table/default-table.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
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
