import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../repositories/auth-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetCsrfTokenUsecaseService implements UseCase<void, void> {
  constructor(private authRepository: AuthRepository) {}
  execute(params: void): Observable<void> {
    return this.authRepository.getCsrfToken();
  }
}
