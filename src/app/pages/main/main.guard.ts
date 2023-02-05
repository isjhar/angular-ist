import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import {
  ACCESS_CONTROL_REPOSITORY,
  AUTHENTICATED_USER_REPOSITORY,
} from 'src/app/app.module';
import { GetUseCaseResponse } from 'src/app/domain/base-use-cases/get-use-case';
import {
  AccessControl,
  AccessControlId,
} from 'src/app/domain/entities/access-control';
import { User } from 'src/app/domain/entities/user';
import { AccessControlRepository } from 'src/app/domain/repositories/access-control-repository';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { GetAccessControlsUseCase } from 'src/app/domain/use-cases/get-access-controls-use-case';
import { GetAuthenticatedUserUseCase } from 'src/app/domain/use-cases/get-authenticated-user-use-case';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  getLoggedUserUseCase: GetAuthenticatedUserUseCase;
  getAccessControlsUseCase: GetAccessControlsUseCase;
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    @Inject(ACCESS_CONTROL_REPOSITORY)
    accessControlRepository: AccessControlRepository,
    private router: Router
  ) {
    this.getLoggedUserUseCase = new GetAuthenticatedUserUseCase(
      authenticatedUserRepository
    );
    this.getAccessControlsUseCase = new GetAccessControlsUseCase(
      accessControlRepository
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url = state.url;
    return this.getLoggedUserUseCase.execute().pipe(
      concatMap((response) =>
        this.getAccessControlsUseCase.execute({
          roleIds: response.roles.map((role) => role.id),
        })
      ),
      map<GetUseCaseResponse<AccessControl>, boolean>((response) => {
        console.log(url);
        let accessControls = response.pagination.data;
        if (accessControls) {
          if (
            url.match('/setting*') &&
            accessControls.find(
              (accessControl) => accessControl.id == AccessControlId.Setting
            ) != undefined
          ) {
            return true;
          }
        }
        this.router.navigate(['']);
        return false;
      })
    );
  }
}
