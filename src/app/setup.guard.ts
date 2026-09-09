import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { SetupStatusService } from 'src/app/pages/shared/setup-status.service';

@Injectable({
  providedIn: 'root',
})
export class SetupGuard implements CanActivate {
  constructor(
    private setupStatusService: SetupStatusService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> {
    return this.setupStatusService.check().pipe(
      map<boolean, boolean | UrlTree>((isSetup) => {
        if (isSetup) {
          return true;
        }
        return this.router.createUrlTree(['/setup']);
      }),
    );
  }
}
