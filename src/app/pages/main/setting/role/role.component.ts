import {
  Component,
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

@Component({
  selector: 'app-role',
  imports: [
    ServerSideTableComponent_1,
    DefaultTableMobileItemViewDirective,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    NgTemplateOutlet,
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
  constructor(
    @Inject(TABLE_SERVICE)
    private tableService: ServerSideTableService<any, any>,
    @Inject(ROLE_REPOSITORY)
    roleRepository: RoleRepository,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private mainService: MainService,
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
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: 'Name',
        showHandset: true,
        sortBy: 'name',
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

  onToggled(element: RoleAccessControlRow): void {
    if (element.id != undefined) {
      this.deleteRoleAccessControluseCase
        .execute({
          accessControlId: element.accessControlId,
          roleId: this.roleId,
        })
        .subscribe(
          (response) => {
            this.table.refreshData();
          },
          (response) => {
            this.snackBar.open('Change access control is failed', 'Close', {
              horizontalPosition: 'start',
              verticalPosition: 'bottom',
            });
          },
        );
      return;
    }

    this.storeRoleAccessControlUseCase
      .execute({
        accessControlId: element.accessControlId,
        roleId: this.roleId,
      })
      .subscribe(
        (response) => {
          this.table.refreshData();
          if (this.isLoggedUserHasToggledAccessControl(element)) {
          }
        },
        (response) => {
          this.snackBar.open('Change access control is failed', 'Close', {
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
          });
        },
      );
  }

  isLoggedUserHasToggledAccessControl(element: RoleAccessControlRow): boolean {
    return false;
  }
}
