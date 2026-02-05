import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ROLE_REPOSITORY } from 'src/app/app-token-repository';
import { DeleteUseCase } from 'src/app/domain/base-use-cases/delete-use-case';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { ConfirmDialogComponent } from 'src/app/pages/shared/confirm-dialog/confirm-dialog.component';
import { ServerSideTableComponent } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.component';
import {
  ServerSideTableService,
  TABLE_SERVICE,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import {
  AddDialogComponent,
  AddDialogData,
} from './add-dialog/add-dialog.component';
import { RolesTableService } from './roles-table.service';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';
import { ServerSideTableComponent as ServerSideTableComponent_1 } from '../../../shared/default-table/server-side-table/server-side-table.component';
import { DefaultTableMobileItemViewDirective } from '../../../shared/default-table/default-table-mobile-item-view.directive';
import { DefaultTableActionContainerDirective } from 'src/app/pages/shared/default-table/default-table-action-container.directive';
import { MatRipple } from '@angular/material/core';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { HasAccessControlDirective } from 'src/app/pages/shared/has-access-control.directive';

@Component({
  selector: 'app-roles',
  imports: [
    ServerSideTableComponent_1,
    DefaultTableMobileItemViewDirective,
    DefaultTableActionContainerDirective,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    NgTemplateOutlet,
    MatRipple,
    HasAccessControlDirective,
  ],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [{ provide: TABLE_SERVICE, useClass: RolesTableService }],
  standalone: true,
})
export class RolesComponent implements OnInit {
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  matConifg: MatDialogConfig = {
    width: '90%',
    maxWidth: 500,
    height: 'auto',
  };

  deleteRoleUseCase: DeleteUseCase;

  router = inject(Router);

  AccessControlId = AccessControlId;

  constructor(
    @Inject(ROLE_REPOSITORY) roleRepository: RoleRepository,
    @Inject(TABLE_SERVICE)
    private tableService: ServerSideTableService<any, any>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.deleteRoleUseCase = new DeleteUseCase(roleRepository);
  }

  ngOnInit(): void {
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: $localize`:name:Name`,
        showHandset: true,
        sortBy: 'name',
      },
    ]);
  }

  onTambahClicked(): void {
    const data: AddDialogData = {
      value: { id: 0, name: '', menus: [] },
    };
    const matConfig = Object.assign({}, this.matConifg, {
      data: data,
    });
    const dialogRef = this.dialog.open(AddDialogComponent, matConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Role added successfully', 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  onDeleteClicked(event: Event, element: any): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '90%',
      maxWidth: 500,
      height: 'auto ',
      data: {
        title: `Delete "${element.name}"?`,
        message: `"${element.name}" will be deleted permanently.`,
        yes$: this.deleteRoleUseCase.execute({ id: element.id }),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Role deleted successfully', 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  onRowClicked(row: any) {
    this.router.navigate(['/setting/roles/' + row.id]);
  }
}
