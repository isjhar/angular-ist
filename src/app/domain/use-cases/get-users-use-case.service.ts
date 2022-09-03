import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_REPOSITORY } from 'src/app/app.module';
import { Pagination } from '../entities/pagination';
import { User } from '../entities/user';
import { UserRepository } from '../repositories/user-repository';
import { GetUseCaseParams, UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetUsersUseCaseService
  implements UseCase<GetUseCaseParams, GetUsersUseCaseResponse>
{
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository
  ) {}
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
