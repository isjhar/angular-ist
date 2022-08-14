import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetAuthenticatedUserUseCaseService implements UseCase<void, User> {
  constructor(
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: void): Observable<User> {
    return this.authenticatedUserRepository.getAuthenticatedUser();
  }
}
