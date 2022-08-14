import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../entities/user';
import { AuthRepository } from '../repositories/auth-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetLoggedInUserUseCaseService
  implements UseCase<void, GetLoggedInUserUseCaseResponse>
{
  constructor(private authRepository: AuthRepository) {}
  execute(params: void): Observable<GetLoggedInUserUseCaseResponse> {
    return this.authRepository.getLoggedInUser().pipe(
      map<User, GetLoggedInUserUseCaseResponse>((response) => {
        return {
          loggedInUser: response,
        };
      })
    );
  }
}

export interface GetLoggedInUserUseCaseResponse {
  loggedInUser: User;
}
