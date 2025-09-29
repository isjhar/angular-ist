import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';
import { IsUrlAccessibleUseCase } from 'src/app/domain/use-cases/is-url-accessible-use-case';
import { BREADCRUMB_REPOSITORY } from 'src/app/app-local-repository';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  isUrlAccessibleUseCase: IsUrlAccessibleUseCase;
  constructor(
    @Inject(BREADCRUMB_REPOSITORY) menuRepository: BreadcrumbRepository,
    private router: Router,
  ) {
    this.isUrlAccessibleUseCase = new IsUrlAccessibleUseCase(menuRepository);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url = state.url;
    return this.isUrlAccessibleUseCase.execute(url).pipe(
      map<boolean, boolean | UrlTree>((response) => {
        if (response) {
          return true;
        } else {
          return this.router.createUrlTree(['']);
        }
      }),
      catchError((error) => {
        return of(this.router.createUrlTree(['']));
      }),
    );
  }
}
