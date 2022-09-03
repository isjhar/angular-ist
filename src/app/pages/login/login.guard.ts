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
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import {
  IsLoggedInUseCaseResponse,
  IsLoggedInUseCaseService,
} from 'src/app/domain/use-cases/is-logged-in-use-case.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  isLoggedInUseCaseService: IsLoggedInUseCaseService;
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    private router: Router
  ) {
    this.isLoggedInUseCaseService = new IsLoggedInUseCaseService(
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
    return this.isLoggedInUseCaseService.execute().pipe(
      map<IsLoggedInUseCaseResponse, boolean>((response) => {
        if (response.isLoggedIn) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      })
    );
  }
}
