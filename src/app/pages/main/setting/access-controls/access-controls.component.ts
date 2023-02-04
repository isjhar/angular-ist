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

@Component({
  selector: 'app-access-controls',
  templateUrl: './access-controls.component.html',
  styleUrls: ['./access-controls.component.scss'],
  providers: [{ provide: TABLE_SERVICE, useClass: AccessControlsTableService }],
})
export class AccessControlsComponent implements OnInit {
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
    ]);
  }
}
