import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { USER_REPOSITORY } from 'src/app/app-token-repository';
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

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { NgTemplateOutlet } from '@angular/common';
import { ServerSideTableComponent as ServerSideTableComponent_1 } from '../../../shared/default-table/server-side-table/server-side-table.component';
import { DefaultTableMobileItemViewDirective } from '../../../shared/default-table/default-table-mobile-item-view.directive';
import { DefaultTableActionContainerDirective } from 'src/app/pages/shared/default-table/default-table-action-container.directive';
import { MatDivider } from '@angular/material/divider';
import { DisplayMode } from 'src/app/pages/shared/default-table/default-table.component';

@Component({
  selector: 'app-users',
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
    MatAutocompleteModule,
    MatCardModule,
    MatIconModule,
    NgTemplateOutlet,
    MatDivider,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [{ provide: TABLE_SERVICE, useClass: UsersTableService }],
  standalone: true,
})
export class UsersComponent implements OnInit {
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  deleteUserUseCase: DeleteUseCase;

  displayMode = DisplayMode;

  constructor(
    @Inject(TABLE_SERVICE)
    private tableService: ServerSideTableService<any, any>,
    @Inject(USER_REPOSITORY) userRepository: UserRepository,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
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
        prop: 'roleNames',
        show: true,
        title: 'Roles',
        sortBy: 'role',
        showHandset: false,
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

  onDeleteClicked(event: Event, element: any): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '90%',
      maxWidth: 500,
      height: 'auto ',
      data: {
        title: `Delete "${element.name}"?`,
        message: `"${element.name}" will be deleted permanently.`,
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
