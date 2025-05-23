import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticatedUserRepository } from '../repositories/authenticated-user-repository';
import { UseCase } from '../base-use-cases/use-case';

export class IsLoggedInUseCase
  implements UseCase<void, IsLoggedInUseCaseResponse>
{
  constructor(
    private authenticatedUserRepository: AuthenticatedUserRepository
  ) {}
  execute(params: void): Observable<IsLoggedInUseCaseResponse> {
    return this.authenticatedUserRepository.isAuthenticated().pipe(
      map<boolean, IsLoggedInUseCaseResponse>((response) => {
        return {
          isLoggedIn: response,
        };
      })
    );
  }
}

export interface IsLoggedInUseCaseResponse {
  isLoggedIn: boolean;
}
