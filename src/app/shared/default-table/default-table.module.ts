import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTableComponent } from './default-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServerSideTableComponent } from './server-side-table/server-side-table.component';

@NgModule({
  declarations: [DefaultTableComponent, ServerSideTableComponent],
  exports: [DefaultTableComponent, ServerSideTableComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class DefaultTableModule {}
