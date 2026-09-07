import {
  ChangeDetectorRef,
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
import { ServerSideTableComponent } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDivider } from '@angular/material/divider';
import { RoleDetail } from 'src/app/domain/entities/role-detail';
import { MatIcon } from '@angular/material/icon';
import { ConfirmDialogComponent } from 'src/app/pages/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import {
  AUTHENTICATED_USER_REPOSITORY,
  BREADCRUMB_REPOSITORY,
} from 'src/app/app-local-repository';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { DefaultTableColumn } from 'src/app/pages/shared/default-table/default-table.component';
import { HasAccessControlDirective } from 'src/app/pages/shared/has-access-control.directive';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';
import { LoadingButtonComponent } from 'src/app/pages/shared/default-form/loading-button/loading-button.component';
import { SubmissionComponent } from 'src/app/pages/shared/submission-component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

interface AccessControlTreeNode {
  name: string;
  description?: string;
  children?: AccessControlTreeNode[];
  id?: number;
  checked?: boolean;
}

@Component({
  selector: 'app-role',
  imports: [
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDivider,
    MatIcon,
    MatIconButton,
    MatButtonModule,
    HasAccessControlDirective,
    MatTreeModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    LoadingButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],

  standalone: true,
})
export class RoleComponent extends SubmissionComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: true })
  table!: ServerSideTableComponent;

  roleId: number = 0;
  role?: RoleDetail;

  AccessControlId = AccessControlId;

  accessControls: RoleAccessControl[] = [];
  isLoadingAccessControls = false;

  treeDataSource: AccessControlTreeNode[] = [];
  private originalCheckedIds = new Set<number>();

  private cdr = inject(ChangeDetectorRef);

  childrenAccessorFn = (node: AccessControlTreeNode): AccessControlTreeNode[] =>
    node.children ?? [];

  hasChildren = (_: number, node: AccessControlTreeNode) =>
    !!node.children && node.children.length > 0;

  private authenticatedUserRepository = inject<AuthenticatedUserRepository>(
    AUTHENTICATED_USER_REPOSITORY,
  );

  formGroup = new FormGroup({});

  constructor(
    @Inject(ROLE_REPOSITORY)
    private roleRepository: RoleRepository,
    @Inject(BREADCRUMB_REPOSITORY)
    private breadcrumbRepository: BreadcrumbRepository,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    super();
    if (this.route.snapshot.paramMap.has('id')) {
      this.roleId = parseInt(this.route.snapshot.paramMap.get('id')!);
    }
  }

  override ngOnInit(): void {
    this.findRole();
    this.loadAccessControls();
  }

  loadAccessControls(): void {
    this.isLoadingAccessControls = true;
    this.roleRepository
      .getRoleAccessControls({ roleId: this.roleId, page: 1, limit: 100 })
      .subscribe({
        next: (response) => {
          this.accessControls = response;
          this.treeDataSource = this.buildTreeData(this.accessControls);
          this.storeOriginalCheckedIds();
          this.isLoadingAccessControls = false;
        },
        error: () => {
          this.isLoadingAccessControls = false;
        },
      });
  }

  private storeOriginalCheckedIds(): void {
    this.originalCheckedIds.clear();
    this.collectCheckedIds(this.treeDataSource, this.originalCheckedIds);
  }

  private collectCheckedIds(
    nodes: AccessControlTreeNode[],
    ids: Set<number>,
  ): void {
    for (const node of nodes) {
      if (node.id !== undefined && node.checked) {
        ids.add(node.id);
      }
      if (node.children) {
        this.collectCheckedIds(node.children, ids);
      }
    }
  }

  get hasChanges(): boolean {
    const currentIds = new Set<number>();
    this.collectCheckedIds(this.treeDataSource, currentIds);
    if (currentIds.size !== this.originalCheckedIds.size) return true;
    for (const id of currentIds) {
      if (!this.originalCheckedIds.has(id)) return true;
    }
    return false;
  }

  save(): void {
    this.isLoading = true;

    const checkedIds = new Set<number>();
    this.collectCheckedIds(this.treeDataSource, checkedIds);
    this.roleRepository
      .syncAccessControl({
        roleId: this.roleId,
        accessControlIds: Array.from(checkedIds),
      })
      .subscribe({
        next: () => {
          this.storeOriginalCheckedIds();
          this.isLoading = false;
          this.snackBarService.showSuccess(
            $localize`:accessControlSaved:Access control saved`,
          );
        },
        error: () => {
          this.isLoading = false;
          this.snackBarService.showError(
            $localize`:accessControlSaveFailed:Access control save failed`,
          );
        },
      });
  }

  buildTreeData(controls: RoleAccessControl[]): AccessControlTreeNode[] {
    return controls.map((category) => ({
      name: category.name,
      children: category.accessControls.map((ac) => ({
        name: ac.name,
        description: ac.description,
        id: ac.id,
        checked: ac.value,
      })),
    }));
  }

  isAllChecked(node: AccessControlTreeNode): boolean {
    if (!node.children) return false;
    return node.children.every((child) => child.checked);
  }

  isIndeterminate(node: AccessControlTreeNode): boolean {
    if (!node.children || node.children.length === 0) return false;
    const checked = node.children.filter((child) => child.checked).length;
    return checked > 0 && checked < node.children.length;
  }

  toggleAll(node: AccessControlTreeNode, checked: boolean): void {
    if (!node.children) return;
    node.children.forEach((child) => {
      if (child.checked !== checked) {
        this.toggleAccessControl(child, checked);
      }
    });
  }

  toggleAccessControl(node: AccessControlTreeNode, checked: boolean): void {
    node.checked = checked;
    this.cdr.markForCheck();
  }

  findRole(): void {
    this.roleRepository.find(this.roleId).subscribe({
      next: (response) => {
        this.role = response;
        this.breadcrumbRepository.setDynamicLabelDict({ id: this.role.name });
      },
    });
  }

  onDeleteClicked(): void {
    const element = this.role;
    if (!element) return;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '90%',
      maxWidth: 500,
      height: 'auto ',
      data: {
        title: $localize`:deleteSomething:Delete "${element.name}"?`,
        message: $localize`:deleteSomethingPermanently:"${element.name}" will be deleted permanently.`,
        yes$: this.roleRepository.delete(element.id),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.table.refreshData();
        this.snackBar.open(
          $localize`:roleDeletedSuccessfully:Role deleted successfully`,
          'Close',
          {
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
          },
        );
      }
    });
  }
}
