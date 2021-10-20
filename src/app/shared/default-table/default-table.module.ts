import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTableComponent } from './default-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [DefaultTableComponent],
  exports: [DefaultTableComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class DefaultTableModule {}
