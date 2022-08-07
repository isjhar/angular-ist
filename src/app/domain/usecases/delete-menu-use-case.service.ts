import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuRepository } from '../repositories/menu-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class DeleteMenuUseCaseService implements UseCase<number, any> {
  constructor(private menuRepository: MenuRepository) {}
  execute(params: number): Observable<any> {
    return this.menuRepository.delete(params);
  }
}
