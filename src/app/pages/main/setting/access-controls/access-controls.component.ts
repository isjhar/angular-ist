import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACCESS_CONTROL_REPOSITORY } from 'src/app/app.module';
import { DeleteUseCase } from 'src/app/domain/base-use-cases/delete-use-case';
import { AccessControlRepository } from 'src/app/domain/repositories/access-control-repository';
import { ConfirmDialogComponent } from 'src/app/pages/shared/confirm-dialog/confirm-dialog.component';
import { ServerSideTableComponent } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.component';
import {
  ServerSideTableService,
  TABLE_SERVICE,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import { AccessControlsTableService } from './access-controls-table.service';
import {
  AddDialogComponent,
  AddDialogData,
} from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-access-controls',
  templateUrl: './access-controls.component.html',
  styleUrls: ['./access-controls.component.scss'],
  providers: [{ provide: TABLE_SERVICE, useClass: AccessControlsTableService }],
})
export class AccessControlsComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  matConifg: MatDialogConfig = {
    width: '90%',
    maxWidth: 500,
    height: 'auto',
  };

  deleteUseCase: DeleteUseCase;

  constructor(
    @Inject(ACCESS_CONTROL_REPOSITORY)
    accessControlRepository: AccessControlRepository,
    @Inject(TABLE_SERVICE)
    private tableService: ServerSideTableService<any, any>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.deleteUseCase = new DeleteUseCase(accessControlRepository);
  }

  ngOnInit(): void {
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: 'Name',
      },
      {
        prop: 'description',
        show: true,
        title: 'Description',
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
      name: '',
      description: '',
    };
    const matConfig = Object.assign({}, this.matConifg, {
      data: data,
    });
    const dialogRef = this.dialog.open(AddDialogComponent, matConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Access control added successfully', 'Close', {
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
        yes$: this.deleteUseCase.execute({
          id: element.id,
        }),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Access control deleted successfully', 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
