import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IsLoggedInUseCaseResponse,
  IsLoggedInUseCaseService,
} from './domain/usecases/is-logged-in-use-case.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private isLoggedInUseCaseService: IsLoggedInUseCaseService,
    private router: Router
  ) {}
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
        if (!response.isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
