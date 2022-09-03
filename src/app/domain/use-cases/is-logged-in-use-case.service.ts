import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app.module';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInUseCaseService
  implements UseCase<void, IsLoggedInUseCaseResponse>
{
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: void): Observable<IsLoggedInUseCaseResponse> {
    return this.authenticatedUserRepository.isAuthenticated().pipe(
      map<boolean, IsLoggedInUseCaseResponse>((response) => {
        return {
          isLoggedIn: response,
        };
      })
    );
  }
}

export interface IsLoggedInUseCaseResponse {
  isLoggedIn: boolean;
}
