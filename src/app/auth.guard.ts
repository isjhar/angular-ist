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
import { AUTHENTICATED_USER_REPOSITORY } from './app.module';
import { AuthenticatedUserRepository } from './domain/repositories/authenticated-user-repository';
import {
  IsLoggedInUseCaseResponse,
  IsLoggedInUseCase,
} from './domain/use-cases/is-logged-in-use-case';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLoggedInUseCase: IsLoggedInUseCase;
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    private router: Router
  ) {
    this.isLoggedInUseCase = new IsLoggedInUseCase(authenticatedUserRepository);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLoggedInUseCase.execute().pipe(
      map<IsLoggedInUseCaseResponse, boolean>((response) => {
        if (!response.isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
