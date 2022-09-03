import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app.module';
import { User } from '../entities/user';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetAuthenticatedUserUseCaseService implements UseCase<void, User> {
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: void): Observable<User> {
    return this.authenticatedUserRepository.getAuthenticatedUser();
  }
}
