import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../entities/user';
import { UserRepository } from '../repositories/user-repository';
import { UseCase } from './use-case';

export class StoreUserUseCaseService
  implements UseCase<StoreUserUseCaseParams, StoreUserUseCaseResponse>
{
  constructor(private userRepository: UserRepository) {}
  execute(
    params: StoreUserUseCaseParams
  ): Observable<StoreUserUseCaseResponse> {
    return this.userRepository.store(params).pipe(
      map<User, StoreUserUseCaseResponse>((element) => {
        return {
          user: element,
        };
      })
    );
  }
}

export interface StoreUserUseCaseParams {
  email: string;
  name: string;
  password: string;
  roles: number[];
}

export interface StoreUserUseCaseResponse {
  user: User;
}
