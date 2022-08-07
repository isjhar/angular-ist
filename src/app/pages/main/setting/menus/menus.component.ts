import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteMenuUseCaseService } from 'src/app/domain/usecases/delete-menu-use-case.service';
import { ConfirmDialogComponent } from 'src/app/pages/shared/confirm-dialog/confirm-dialog.component';
import { ServerSideTableComponent } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.component';
import { ServerSideTableService } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import {
  AddDialogComponent,
  AddDialogData,
} from './add-dialog/add-dialog.component';
import { MenusTableService } from './menus-table.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
  providers: [{ provide: ServerSideTableService, useClass: MenusTableService }],
})
export class MenusComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  matConifg: MatDialogConfig = {
    width: '90%',
    maxWidth: 500,
    height: 'auto',
  };

  constructor(
    private deleteMenuUseCaseService: DeleteMenuUseCaseService,
    private tableService: ServerSideTableService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: 'Name',
      },
      {
        prop: 'url',
        show: true,
        title: 'Url',
      },
      {
        prop: 'id',
        show: true,
        title: 'Action',
        cellTemplate: this.actionTemplate,
      },
    ]);
  }

  onAddClicked(): void {
    const data: AddDialogData = {
      value: { id: 0, name: '', url: '' },
    };
    const matConfig = Object.assign({}, this.matConifg, {
      data: data,
    });
    const dialogRef = this.dialog.open(AddDialogComponent, matConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Menu added successfully', 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  onEditClicked(element: any): void {
    const data: AddDialogData = {
      value: {
        id: element.id,
        name: element.name,
        url: element.url,
      },
    };
    const matConfig = Object.assign({}, this.matConifg, {
      data: data,
    });
    const dialogRef = this.dialog.open(AddDialogComponent, matConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Menu edited successfully', 'Close', {
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
        yes$: this.deleteMenuUseCaseService.execute(element.id),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Menu deleted successfully', 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
