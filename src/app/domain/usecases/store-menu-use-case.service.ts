import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../entities/menu';
import {
  MenuRepository,
  StoreMenuRequestParams,
} from '../repositories/menu-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class StoreMenuUseCaseService
  implements UseCase<StoreMenuRequestParams, Menu>
{
  constructor(private menuRepository: MenuRepository) {}
  execute(params: StoreMenuRequestParams): Observable<Menu> {
    return this.menuRepository.store(params);
  }
}
