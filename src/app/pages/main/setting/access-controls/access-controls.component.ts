import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ACCESS_CONTROL_REPOSITORY } from 'src/app/app-token-repository';
import { DeleteUseCase } from 'src/app/domain/base-use-cases/delete-use-case';
import { AccessControlRepository } from 'src/app/domain/repositories/access-control-repository';
import { ServerSideTableComponent } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.component';
import {
  ServerSideTableService,
  TABLE_SERVICE,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import { AccessControlsTableService } from './access-controls-table.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DefaultTableMobileItemViewDirective } from 'src/app/pages/shared/default-table/default-table-mobile-item-view.directive';

@Component({
  selector: 'app-access-controls',
  imports: [
    ServerSideTableComponent,
    DefaultTableMobileItemViewDirective,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './access-controls.component.html',
  styleUrls: ['./access-controls.component.scss'],
  providers: [{ provide: TABLE_SERVICE, useClass: AccessControlsTableService }],
  standalone: true,
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
  ) {
    this.deleteUseCase = new DeleteUseCase(accessControlRepository);
  }

  ngOnInit(): void {
    this.tableService.changeColumns([
      {
        prop: 'name',
        show: true,
        title: $localize`:name:Name`,
        showHandset: true,
      },
      {
        prop: 'description',
        show: true,
        title: $localize`:description:Description`,
        showHandset: true,
      },
    ]);
  }
}
