import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTableComponent } from './default-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServerSideTableComponent } from './server-side-table/server-side-table.component';
import { MatSortModule } from '@angular/material/sort';
import { SearchFieldComponent } from './server-side-table/search-field/search-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DefaultTableComponent,
    ServerSideTableComponent,
    SearchFieldComponent,
  ],
  exports: [DefaultTableComponent, ServerSideTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FlexLayoutModule,
  ],
})
export class DefaultTableModule {}
