import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PengaturanRoutingModule } from './pengaturan-routing.module';
import { PengaturanComponent } from './pengaturan.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { PenggunaComponent } from './pengguna/pengguna.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DefaultTableModule } from 'src/app/shared/default-table/default-table.module';

@NgModule({
  declarations: [PengaturanComponent, PenggunaComponent],
  imports: [
    CommonModule,
    PengaturanRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    DefaultTableModule,
  ],
})
export class PengaturanModule {}
