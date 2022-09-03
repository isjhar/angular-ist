import { Observable } from 'rxjs';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from './use-case';

export class DeleteAuthenticatedUserUseCaseService
  implements UseCase<void, void>
{
  constructor(
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: void): Observable<void> {
    return this.authenticatedUserRepository.delete();
  }
}
