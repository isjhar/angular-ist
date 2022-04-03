import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { AddMenuDialogComponent } from './add-menu-dialog/add-menu-dialog.component';
import { DefaultTableModule } from 'src/app/shared/default-table/default-table.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DefaultFormModule } from 'src/app/shared/default-form/default-form.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MenuComponent, AddMenuDialogComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
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
export class MenuModule {}
