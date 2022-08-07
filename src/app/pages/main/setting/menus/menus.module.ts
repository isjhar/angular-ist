import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MenusComponent } from './menus.component';
import { DefaultTableModule } from 'src/app/pages/shared/default-table/default-table.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DefaultFormModule } from 'src/app/pages/shared/default-form/default-form.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AddDialogComponent, MenusComponent],
  imports: [
    CommonModule,
    MenusRoutingModule,
    DefaultTableModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    DefaultFormModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
  ],
})
export class MenusModule {}
