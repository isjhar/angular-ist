import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { HasAuthenticatedUserAccessControlUseCase } from 'src/app/domain/use-cases/has-authenticated-user-access-control-use-case';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app-local-repository';
import { MatCardModule } from '@angular/material/card';

import { AsyncPipe } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { FilterComponent } from 'src/app/pages/main/dashboard/filter/filter.component';
import { FilterService } from 'src/app/pages/main/dashboard/filter.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, AsyncPipe, AdminComponent, FilterComponent],
  providers: [FilterService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  adminAccessControl$: Observable<boolean>;

  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
  ) {
    let hasAuthenticatedUserAccessControlUseCase =
      new HasAuthenticatedUserAccessControlUseCase(authenticatedUserRepository);
    this.adminAccessControl$ = hasAuthenticatedUserAccessControlUseCase.execute(
      AccessControlId.Setting,
    );
  }

  ngOnInit(): void {}
}
