import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app.module';
import { User } from '../entities/user';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class StoreAuthenticatedUserUseCaseService
  implements UseCase<StoreAuthenticatedUserUseCaseParams, void>
{
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: StoreAuthenticatedUserUseCaseParams): Observable<void> {
    return this.authenticatedUserRepository.store(params.loggedInUser);
  }
}

export interface StoreAuthenticatedUserUseCaseParams {
  loggedInUser: User;
}
