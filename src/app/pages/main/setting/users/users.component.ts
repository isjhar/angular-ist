import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { USER_REPOSITORY } from 'src/app/mock-repository.module';
import { DeleteUseCase } from 'src/app/domain/base-use-cases/delete-use-case';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import { ConfirmDialogComponent } from 'src/app/pages/shared/confirm-dialog/confirm-dialog.component';
import { ServerSideTableComponent } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.component';
import {
  ServerSideTableService,
  TABLE_SERVICE,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { UsersTableService } from './users-table.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [{ provide: TABLE_SERVICE, useClass: UsersTableService }],
})
export class UsersComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  deleteUserUseCase: DeleteUseCase;

  constructor(
    @Inject(TABLE_SERVICE)
    private tableService: ServerSideTableService<any, any>,
    @Inject(USER_REPOSITORY) userRepository: UserRepository,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.deleteUserUseCase = new DeleteUseCase(userRepository);
  }

  ngOnInit(): void {
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: 'Name',
        sortBy: 'name',
        showHandset: true,
      },
      {
        prop: 'email',
        show: true,
        title: 'Email',
        sortBy: 'email',
        showHandset: true,
      },
      {
        prop: 'role_names',
        show: true,
        title: 'Roles',
        sortBy: 'role_names',
        showHandset: false,
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

  delete(id: number): Observable<void> {
    return this.deleteUserUseCase.execute({ id: id });
  }
}
