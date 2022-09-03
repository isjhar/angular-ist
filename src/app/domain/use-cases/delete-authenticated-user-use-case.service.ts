import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app.module';
import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class DeleteAuthenticatedUserUseCaseService
  implements UseCase<void, void>
{
  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: void): Observable<void> {
    return this.authenticatedUserRepository.delete();
  }
}
