import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AuthRepository, LoginParams } from '../repositories/auth-repository';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from './use-case';

export class LoginUseCaseService implements UseCase<LoginParams, void> {
  constructor(
    private authenticatedUserRepository: AuthenticatedUserRepository,
    private authRepository: AuthRepository
  ) {}
  execute(params: LoginParams): Observable<void> {
    return this.authRepository.getCsrfToken().pipe(
      concatMap((response) => this.authRepository.login(params)),
      concatMap((response) => this.authRepository.getLoggedInUser()),
      concatMap((response) => this.authenticatedUserRepository.store(response))
    );
  }
}
