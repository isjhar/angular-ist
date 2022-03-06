import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ServerSideTableComponent } from 'src/app/shared/default-table/server-side-table/server-side-table.component';
import { ServerSideTableService } from 'src/app/shared/default-table/server-side-table/server-side-table.service';
import { UserHttpService } from '../user-http.service';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { UserTableService } from './user-table.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [{ provide: ServerSideTableService, useClass: UserTableService }],
})
export class UserComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  constructor(
    private tableService: ServerSideTableService,
    private userHttpService: UserHttpService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: 'Name',
        sortable: true,
      },
      {
        prop: 'email',
        show: true,
        title: 'Email',
        sortable: true,
      },
      {
        prop: 'role_names',
        show: true,
        title: 'Roles',
        sortable: true,
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
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '90%',
      maxWidth: 500,
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Tambah penggunan berhasil', 'Tutup', {
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
        message: 'Apakah kamu yakin akan menghapus pengguna ini?',
        yes$: this.delete(element.id),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Pengguna berhasil dihapus', 'Tutup', {
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
