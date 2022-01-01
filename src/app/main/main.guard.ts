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
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url = state.url;
    return this.authService.getUser().pipe(
      map((user) => {
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
