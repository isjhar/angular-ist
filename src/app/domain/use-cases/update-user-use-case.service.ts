import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_REPOSITORY } from 'src/app/app.module';
import { UserRepository } from '../repositories/user-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserUseCaseService
  implements UseCase<UpdateUserUseCaseParams, void>
{
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository
  ) {}
  execute(params: UpdateUserUseCaseParams): Observable<void> {
    return this.userRepository.update(params.id, {
      email: params.email,
      name: params.name,
      password: params.password,
      roles: params.roles,
    });
  }
}

export interface UpdateUserUseCaseParams {
  id: number;
  email: string;
  name: string;
  password: string;
  roles: number[];
}
