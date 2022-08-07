import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { AuthRepository } from '../repositories/auth-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetLoggedUserUseCaseService implements UseCase<void, User> {
  constructor(private authRepository: AuthRepository) {}
  execute(params: void): Observable<User> {
    return this.authRepository.getLoggedUser();
  }
}
