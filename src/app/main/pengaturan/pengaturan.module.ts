import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PengaturanRoutingModule } from './pengaturan-routing.module';
import { PengaturanComponent } from './pengaturan.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { PenggunaComponent } from './pengguna/pengguna.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { DefaultTableModule } from 'src/app/shared/default-table/default-table.module';
import { TambahPenggunaDialogComponent } from './pengguna/tambah-pengguna-dialog/tambah-pengguna-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DefaultFormModule } from 'src/app/shared/default-form/default-form.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    PengaturanComponent,
    PenggunaComponent,
    TambahPenggunaDialogComponent,
  ],
  imports: [
    CommonModule,
    PengaturanRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    DefaultTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DefaultFormModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
})
export class PengaturanModule {}
