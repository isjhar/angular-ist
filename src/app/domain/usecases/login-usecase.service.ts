import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository, LoginParams } from '../repositories/auth-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class LoginUsecaseService implements UseCase<LoginParams, void> {
  constructor(private authRepository: AuthRepository) {}
  execute(params: LoginParams): Observable<void> {
    return this.authRepository.login(params);
  }
}
