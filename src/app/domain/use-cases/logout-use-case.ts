import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { AuthRepository } from '../repositories/auth-repository';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from '../base-use-cases/use-case';

export class LogoutUseCase implements UseCase<void, void> {
  constructor(
    private authenticatedUserRepository: AuthenticatedUserRepository,
    private authRepository: AuthRepository
  ) {}
  execute(params: void): Observable<void> {
    return this.authRepository
      .logout()
      .pipe(concatMap((response) => this.authenticatedUserRepository.delete()));
  }
}
