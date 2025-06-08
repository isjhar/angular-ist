import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticatedUserRepository } from './domain/repositories/authenticated-user-repository';
import {
  IsLoggedInUseCaseResponse,
  IsLoggedInUseCase,
} from './domain/use-cases/is-logged-in-use-case';
import { AUTHENTICATED_USER_REPOSITORY } from './app-local-repository.module';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Inject, Injectable } from '@angular/core';

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
  ): MaybeAsync<GuardResult> {
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
