import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { HasAuthenticatedUserAccessControlUseCase } from 'src/app/domain/use-cases/has-authenticated-user-access-control-use-case';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app-local-repository';
import { MatCardModule } from '@angular/material/card';

import { AdminComponent } from './admin/admin.component';
import { FilterComponent } from 'src/app/pages/main/dashboard/filter/filter.component';
import { FilterService } from 'src/app/pages/main/dashboard/filter.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, AdminComponent, FilterComponent],
  providers: [FilterService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
  ) {
    let hasAuthenticatedUserAccessControlUseCase =
      new HasAuthenticatedUserAccessControlUseCase(authenticatedUserRepository);
  }

  ngOnInit(): void {}
}
