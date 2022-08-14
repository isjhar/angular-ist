import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: StoreAuthenticatedUserUseCaseParams): Observable<void> {
    return this.authenticatedUserRepository.store(params.loggedInUser);
  }
}

export interface StoreAuthenticatedUserUseCaseParams {
  loggedInUser: User;
}
