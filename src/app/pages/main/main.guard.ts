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
import { MenuService } from '../menu.service';

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
    private menuService: MenuService,
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
      map<User, boolean>((response) => {
        let menu = this.menuService.findMenuByUrl(url);
        if (menu) {
          let menuAccessControlId = menu.accessControlId;
          if (
            menuAccessControlId &&
            response.hasAccessControl(menuAccessControlId)
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
