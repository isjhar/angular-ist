import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultTableComponent } from './default-table.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { ServerSideTableComponent } from './server-side-table/server-side-table.component';
import { MatSortModule } from '@angular/material/sort';
import { SearchFieldComponent } from './server-side-table/search-field/search-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextModule } from '../text/text.module';
import { SkeletonModule } from '../skeleton/skeleton.module';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

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
    MatSnackBarModule,
    FlexLayoutModule,
    TextModule,
    SkeletonModule,
  ],
})
export class DefaultTableModule {}
