import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';
import { MenuRepository } from 'src/app/domain/repositories/menu-repository';
import { IsUrlAccessibleUseCase } from 'src/app/domain/use-cases/is-url-accessible-use-case';
import {
  BREADCRUMB_REPOSITORY,
  MENU_REPOSITORY,
} from 'src/app/app-local-repository.module';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  isUrlAccessibleUseCase: IsUrlAccessibleUseCase;
  constructor(
    @Inject(BREADCRUMB_REPOSITORY) menuRepository: BreadcrumbRepository,
    private router: Router
  ) {
    this.isUrlAccessibleUseCase = new IsUrlAccessibleUseCase(menuRepository);
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
    return this.isUrlAccessibleUseCase.execute(url).pipe(
      map<boolean, boolean | UrlTree>((response) => {
        return true;
      }),
      catchError((error) => {
        return of(this.router.createUrlTree(['']));
      })
    );
  }
}
