import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app.module';
import { User } from 'src/app/domain/entities/user';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { GetAuthenticatedUserUseCaseService } from 'src/app/domain/use-cases/get-authenticated-user-use-case.service';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  getLoggedUserUseCaseService: GetAuthenticatedUserUseCaseService;
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    private router: Router
  ) {
    this.getLoggedUserUseCaseService = new GetAuthenticatedUserUseCaseService(
      authenticatedUserRepository
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
    return this.getLoggedUserUseCaseService.execute().pipe(
      map<User, boolean>((user) => {
        for (let i = 0; i < user.roles.length; i++) {
          const role = user.roles[i];
          for (let j = 0; j < role.menus.length; j++) {
            const menu = role.menus[j];
            if (menu.url) {
              let regex = new RegExp(`${menu.url}.*`);
              if (regex.exec(url)) {
                return true;
              }
            } else {
              return true;
            }
          }
        }
        this.router.navigate(['']);
        return false;
      })
    );
  }
}
