import { Observable } from 'rxjs';

import { User } from '../entities/user';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from '../base-use-cases/use-case';

export class GetAuthenticatedUserUseCase implements UseCase<void, User> {
  constructor(
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: void): Observable<User> {
    return this.authenticatedUserRepository.getAuthenticatedUser();
  }
}
