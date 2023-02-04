import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ROLE_ACCESS_CONTROL_REPOSITORY } from 'src/app/app.module';
import { DeleteUseCase } from 'src/app/domain/base-use-cases/delete-use-case';
import { RoleAccessControlRepository } from 'src/app/domain/repositories/role-access-control-repository';
import { StoreAccessControlUseCase } from 'src/app/domain/use-cases/store-access-control-use-case';
import { StoreRoleAccessControlUseCase } from 'src/app/domain/use-cases/store-role-access-control-use-case';
import { ServerSideTableComponent } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.component';
import {
  ServerSideTableService,
  TABLE_SERVICE,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import { AccessControlRow } from '../access-controls/access-controls-table.service';
import { RoleAccessControlRow, RoleTableService } from './role-table.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [
    {
      provide: TABLE_SERVICE,
      useClass: RoleTableService,
    },
  ],
})
export class RoleComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  storeRoleAccessControlUseCase: StoreRoleAccessControlUseCase;
  deleteRoleAccessControluseCase: DeleteUseCase;
  constructor(
    @Inject(TABLE_SERVICE)
    private tableService: ServerSideTableService<any, any>,
    @Inject(ROLE_ACCESS_CONTROL_REPOSITORY)
    roleAccessControlRepository: RoleAccessControlRepository,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.storeRoleAccessControlUseCase = new StoreRoleAccessControlUseCase(
      roleAccessControlRepository
    );
    this.deleteRoleAccessControluseCase = new DeleteUseCase(
      roleAccessControlRepository
    );
  }

  ngOnInit(): void {
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: 'Name',
      },
      {
        prop: 'id',
        show: true,
        title: 'Action',
        cellTemplate: this.actionTemplate,
      },
    ]);
  }

  onToggled(element: RoleAccessControlRow): void {
    if (element.id != undefined) {
      this.deleteRoleAccessControluseCase.execute({ id: element.id }).subscribe(
        (response) => {
          this.table.refreshData();
        },
        (response) => {
          this.snackBar.open('Change access control is failed', 'Close', {
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
          });
        }
      );
      return;
    }

    this.storeRoleAccessControlUseCase
      .execute({ accessControlId: element.accessControlId, roleId: 1 })
      .subscribe(
        (response) => {
          this.table.refreshData();
        },
        (response) => {
          this.snackBar.open('Change access control is failed', 'Close', {
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
          });
        }
      );
  }
}
