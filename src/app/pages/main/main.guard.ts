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
import { MenuRepository } from 'src/app/domain/repositories/menu-repository';
import { IsUrlAccessibleUseCase } from 'src/app/domain/use-cases/is-url-accessible-use-case';
import { MENU_REPOSITORY } from 'src/app/local-repository.module';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  isUrlAccessibleUseCase: IsUrlAccessibleUseCase;
  constructor(
    @Inject(MENU_REPOSITORY) menuRepository: MenuRepository,
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
        if (response) {
          return true;
        }
        return this.router.createUrlTree(['']);
      })
    );
  }
}
