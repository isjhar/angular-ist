import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ServerSideTableComponent } from 'src/app/shared/default-table/server-side-table/server-side-table.component';
import { ServerSideTableService } from 'src/app/shared/default-table/server-side-table/server-side-table.service';
import { MenuHttpService } from '../menu-http.service';
import {
  AddMenuDialogComponent,
  AddMenuDialogData,
} from './add-menu-dialog/add-menu-dialog.component';
import { MenuTableService } from './menu-table.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [{ provide: ServerSideTableService, useClass: MenuTableService }],
})
export class MenuComponent implements OnInit {
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
    private tableService: ServerSideTableService,
    private httpService: MenuHttpService,
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
    const data: AddMenuDialogData = {
      value: { id: 0, name: '', url: '' },
    };
    const matConfig = Object.assign({}, this.matConifg, {
      data: data,
    });
    const dialogRef = this.dialog.open(AddMenuDialogComponent, matConfig);
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
    const data: AddMenuDialogData = {
      value: {
        id: element.id,
        name: element.name,
        url: element.url,
      },
    };
    const matConfig = Object.assign({}, this.matConifg, {
      data: data,
    });
    const dialogRef = this.dialog.open(AddMenuDialogComponent, matConfig);
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
        yes$: this.httpService.delete(element.id),
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
