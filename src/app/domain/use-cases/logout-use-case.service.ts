import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_REPOSITORY } from 'src/app/app.module';
import { AuthRepository } from '../repositories/auth-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCaseService implements UseCase<void, void> {
  constructor(
    @Inject(AUTH_REPOSITORY) private authRepository: AuthRepository
  ) {}
  execute(params: void): Observable<void> {
    return this.authRepository.logout();
  }
}
