import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { HasAuthenticatedUserAccessControlUseCase } from 'src/app/domain/use-cases/has-authenticated-user-access-control-use-case';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app-local-repository.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  adminAccessControl$: Observable<boolean>;

  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository
  ) {
    let hasAuthenticatedUserAccessControlUseCase =
      new HasAuthenticatedUserAccessControlUseCase(authenticatedUserRepository);
    this.adminAccessControl$ = hasAuthenticatedUserAccessControlUseCase.execute(
      AccessControlId.Setting
    );
  }

  ngOnInit(): void {}
}
