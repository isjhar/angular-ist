import {
  Component,
  inject,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ROLE_REPOSITORY } from 'src/app/app-token-repository';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { DeleteRoleAccessControlUseCase } from 'src/app/domain/use-cases/delete-role-access-control-use-case';
import { StoreRoleAccessControlUseCase } from 'src/app/domain/use-cases/store-role-access-control-use-case';
import { ServerSideTableComponent } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.component';
import {
  ServerSideTableService,
  TABLE_SERVICE,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import { MainService } from '../../main.service';
import { RoleAccessControlRow, RoleTableService } from './role-table.service';

import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgTemplateOutlet } from '@angular/common';
import { ServerSideTableComponent as ServerSideTableComponent_1 } from '../../../shared/default-table/server-side-table/server-side-table.component';
import { DefaultTableMobileItemViewDirective } from '../../../shared/default-table/default-table-mobile-item-view.directive';
import { MatDivider } from '@angular/material/divider';
import { RoleDetail } from 'src/app/domain/entities/role-detail';
import { MatIcon } from '@angular/material/icon';
import { ConfirmDialogComponent } from 'src/app/pages/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconButton } from '@angular/material/button';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app-local-repository';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { DefaultTableColumn } from 'src/app/pages/shared/default-table/default-table.component';

@Component({
  selector: 'app-role',
  imports: [
    ServerSideTableComponent_1,
    DefaultTableMobileItemViewDirective,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    NgTemplateOutlet,
    MatDivider,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [
    {
      provide: TABLE_SERVICE,
      useClass: RoleTableService,
    },
  ],
  standalone: true,
})
export class RoleComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  storeRoleAccessControlUseCase: StoreRoleAccessControlUseCase;
  deleteRoleAccessControluseCase: DeleteRoleAccessControlUseCase;
  roleId: number = 0;
  role?: RoleDetail;

  private authenticatedUserRepository = inject<AuthenticatedUserRepository>(
    AUTHENTICATED_USER_REPOSITORY,
  );

  constructor(
    @Inject(TABLE_SERVICE)
    private tableService: ServerSideTableService<any, any>,
    @Inject(ROLE_REPOSITORY)
    private roleRepository: RoleRepository,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private mainService: MainService,
    private dialog: MatDialog,
  ) {
    this.storeRoleAccessControlUseCase = new StoreRoleAccessControlUseCase(
      roleRepository,
    );
    this.deleteRoleAccessControluseCase = new DeleteRoleAccessControlUseCase(
      roleRepository,
    );

    if (this.route.snapshot.paramMap.has('id')) {
      this.roleId = parseInt(this.route.snapshot.paramMap.get('id')!);
    }
  }

  ngOnInit(): void {
    const columns: DefaultTableColumn[] = [
      {
        prop: 'name',
        show: true,
        title: 'Name',
        showHandset: true,
        sortBy: 'name',
      },
      {
        prop: 'description',
        show: true,
        title: 'Description',
        showHandset: true,
        sortBy: 'description',
      },
    ];

    this.authenticatedUserRepository
      .hasAccessControl(AccessControlId.EditRole)
      .subscribe((hasAccess) => {
        if (hasAccess) {
          columns.push({
            prop: 'id',
            show: true,
            title: 'Action',
            cellTemplate: this.actionTemplate,
            showHandset: true,
          });
        }
        this.tableService.changeColumns(columns);
      });

    this.findRole();
  }

  findRole(): void {
    this.roleRepository.find(this.roleId).subscribe({
      next: (response) => {
        this.role = response;
      },
    });
  }

  onToggled(element: RoleAccessControlRow): void {
    if (element.id != undefined) {
      this.deleteRoleAccessControluseCase
        .execute({
          accessControlId: element.accessControlId,
          roleId: this.roleId,
        })
        .subscribe({
          next: (response) => {
            this.table.refreshData();
          },
          error: (response) => {
            this.snackBar.open('Change access control is failed', 'Close', {
              horizontalPosition: 'start',
              verticalPosition: 'bottom',
            });
          },
        });
      return;
    }

    this.storeRoleAccessControlUseCase
      .execute({
        accessControlId: element.accessControlId,
        roleId: this.roleId,
      })
      .subscribe({
        next: (response) => {
          this.table.refreshData();
          if (this.isLoggedUserHasToggledAccessControl(element)) {
          }
        },
        error: (response) => {
          this.snackBar.open('Change access control is failed', 'Close', {
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
          });
        },
      });
  }

  isLoggedUserHasToggledAccessControl(element: RoleAccessControlRow): boolean {
    return false;
  }

  onDeleteClicked(): void {
    const element = this.role;
    if (!element) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '90%',
      maxWidth: 500,
      height: 'auto ',
      data: {
        title: `Delete "${element.name}"?`,
        message: `"${element.name}" will be deleted permanently.`,
        yes$: this.roleRepository.delete(element.id),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open('Role deleted successfully', 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
