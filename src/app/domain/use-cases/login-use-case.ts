import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { AuthRepository, LoginParams } from '../repositories/auth-repository';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from '../base-use-cases/use-case';

export class LoginUseCase implements UseCase<LoginParams, void> {
  constructor(
    private authenticatedUserRepository: AuthenticatedUserRepository,
    private authRepository: AuthRepository
  ) {}
  execute(params: LoginParams): Observable<void> {
    return this.authRepository.getCsrfToken().pipe(
      concatMap((response) => this.authRepository.login(params)),
      concatMap((user) => this.authenticatedUserRepository.store(user))
    );
  }
}
