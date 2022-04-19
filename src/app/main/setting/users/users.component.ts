import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ServerSideTableComponent } from 'src/app/shared/default-table/server-side-table/server-side-table.component';
import { ServerSideTableService } from 'src/app/shared/default-table/server-side-table/server-side-table.service';
import { UsersHttpService } from '../users-http.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { UsersTableService } from './users-table.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [{ provide: ServerSideTableService, useClass: UsersTableService }],
})
export class UsersComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  constructor(
    private tableService: ServerSideTableService,
    private userHttpService: UsersHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: 'Name',
        sortBy: 'name',
      },
      {
        prop: 'email',
        show: true,
        title: 'Email',
        sortBy: 'email',
      },
      {
        prop: 'role_names',
        show: true,
        title: 'Roles',
        sortBy: 'role_names',
      },
      {
        prop: 'id',
        show: true,
        title: 'Action',
        cellTemplate: this.actionTemplate,
      },
    ]);
  }

  onTambahClicked(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '90%',
      maxWidth: 500,
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('User added successfully', 'Close', {
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
        yes$: this.delete(element.id),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('User deleted successfully', 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  delete(id: number): Observable<any> {
    return this.userHttpService.deleteUser(id);
  }
}
