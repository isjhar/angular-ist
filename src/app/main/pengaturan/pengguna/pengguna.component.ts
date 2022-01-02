import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import {
  DefaultTableColumn,
  DefaultTableComponent,
} from 'src/app/shared/default-table/default-table.component';
import { UserService } from '../user.service';
import { TambahPenggunaDialogComponent } from './tambah-pengguna-dialog/tambah-pengguna-dialog.component';

@Component({
  selector: 'app-pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.scss'],
})
export class PenggunaComponent implements OnInit, AfterViewInit {
  dataSource: any[] = [];
  length: number = 0;
  columns: DefaultTableColumn[] = [];

  @ViewChild(DefaultTableComponent, { static: true })
  table!: DefaultTableComponent;
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.columns = [
      {
        prop: 'name',
        show: true,
        title: 'Name',
      },
      {
        prop: 'email',
        show: true,
        title: 'Email',
      },
      {
        prop: 'roles',
        show: true,
        title: 'Peran',
      },
      {
        prop: 'aksi',
        show: true,
        title: 'Aksi',
        cellTemplate: this.actionTemplate,
      },
    ];
  }

  ngAfterViewInit(): void {
    this.getList();
  }

  onPageChanged(event: any): void {
    this.getList();
  }

  onTambahClicked(): void {
    const dialogRef = this.dialog.open(TambahPenggunaDialogComponent, {
      width: '90%',
      maxWidth: 500,
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getList();
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
        this.getList();
        this.snackBar.open('Pengguna berhasil dihapus', 'Tutup', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  getList(): void {
    this.userService
      .getUsers({
        limit: this.table.pageSize,
        page: this.table.pageIndex + 1,
      })
      .subscribe((response) => {
        let position = 0;
        let pagination = response.data;
        this.length = pagination.total;
        this.dataSource = pagination.data.map((x: any) => {
          position++;
          return {
            id: x.id,
            name: x.name,
            email: x.email,
            roles: x.roles.map((role: any) => role.name).join(', '),
          };
        });
        this.table.renderRows();
      });
  }

  delete(id: number): Observable<any> {
    return this.userService.deleteUser(id);
  }
}
