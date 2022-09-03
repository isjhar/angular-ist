import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pagination } from '../entities/pagination';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user-repository';
import { GetUseCaseParams, UseCase } from './use-case';

export class GetUsersUseCaseService
  implements UseCase<GetUseCaseParams, GetUsersUseCaseResponse>
{
  constructor(private userRepository: UserRepository) {}
  execute(params: GetUseCaseParams): Observable<GetUsersUseCaseResponse> {
    return this.userRepository.get(params).pipe(
      map<Pagination<User>, GetUsersUseCaseResponse>((element) => {
        return { pagination: element };
      })
    );
  }
}

export interface GetUsersUseCaseResponse {
  pagination: Pagination<User>;
}
