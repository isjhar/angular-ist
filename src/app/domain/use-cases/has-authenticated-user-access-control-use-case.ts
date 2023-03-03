import { Observable } from 'rxjs';
import { UseCase } from '../base-use-cases/use-case';
import { AccessControlId } from '../entities/access-control';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';

export class HasAuthenticatedUserAccessControlUseCase
  implements UseCase<AccessControlId, boolean>
{
  constructor(
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: AccessControlId): Observable<boolean> {
    return this.authenticatedUserRepository.hasAccessControl(params);
  }
}
