import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../repositories/user-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserUseCaseService
  implements UseCase<DeleteUserUseCaseParams, void>
{
  constructor(private userRepository: UserRepository) {}
  execute(params: DeleteUserUseCaseParams): Observable<void> {
    return this.userRepository.delete(params.id);
  }
}

export interface DeleteUserUseCaseParams {
  id: number;
}
