import { Observable } from 'rxjs';

import { UserRepository } from '../repositories/user-repository';
import { UseCase } from './use-case';

export class UpdateUserUseCaseService
  implements UseCase<UpdateUserUseCaseParams, void>
{
  constructor(private userRepository: UserRepository) {}
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
