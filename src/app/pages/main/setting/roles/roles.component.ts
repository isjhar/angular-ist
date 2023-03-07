import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ROLE_REPOSITORY } from 'src/app/token-repository.module';
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

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [{ provide: TABLE_SERVICE, useClass: RolesTableService }],
})
export class RolesComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  matConifg: MatDialogConfig = {
    width: '90%',
    maxWidth: 500,
    height: 'auto',
  };

  deleteRoleUseCase: DeleteUseCase;
  constructor(
    @Inject(ROLE_REPOSITORY) roleRepository: RoleRepository,
    @Inject(TABLE_SERVICE)
    private tableService: ServerSideTableService<any, any>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.deleteRoleUseCase = new DeleteUseCase(roleRepository);
  }

  ngOnInit(): void {
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: 'Name',
        showHandset: true,
      },
      {
        prop: 'id',
        show: true,
        title: 'Action',
        cellTemplate: this.actionTemplate,
        showHandset: true,
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

  onDeleteClicked(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      maxWidth: 500,
      height: 'auto ',
      data: {
        message: 'Are you sure?',
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
}
