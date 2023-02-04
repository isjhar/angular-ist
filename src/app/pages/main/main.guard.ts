import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app.module';
import { User } from 'src/app/domain/entities/user';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { GetAuthenticatedUserUseCase } from 'src/app/domain/use-cases/get-authenticated-user-use-case';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  getLoggedUserUseCase: GetAuthenticatedUserUseCase;
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    private router: Router
  ) {
    this.getLoggedUserUseCase = new GetAuthenticatedUserUseCase(
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
    return this.getLoggedUserUseCase.execute().pipe(
      map<User, boolean>((user) => {
        if (user) {
          return true;
        }
        this.router.navigate(['']);
        return false;
      })
    );
  }
}
