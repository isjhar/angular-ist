import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FindableRepository } from 'src/app/domain/base-repositories/findable-repository';
import {
  FindUseCase,
  FindUseCaseResponse,
} from 'src/app/domain/base-use-cases/find-use-case';

export abstract class BaseDetailGuardGuard<T> implements CanActivate {
  findUseCase: FindUseCase<T>;
  constructor(
    protected router: Router,
    findableRepository: FindableRepository<T>
  ) {
    this.findUseCase = new FindUseCase<T>(findableRepository);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let id = 0;
    if (route.paramMap.has('id')) {
      id = parseInt(route.paramMap.get('id')!);
    }
    return this.findUseCase.execute({ id: id }).pipe(
      map<FindUseCaseResponse<T>, boolean | UrlTree>((response) => {
        return true;
      }),
      catchError((error) => {
        return of(this.router.createUrlTree(['']));
      })
    );
  }
}
