import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Menu } from '../entities/menu';
import {
  MenuRepository,
  StoreMenuRequestParams,
} from '../repositories/menu-repository';
import { UseCase } from './use-case';

export class StoreMenuUseCaseService
  implements UseCase<StoreMenuUseCaseParams, StoreMenuUseCaseResponse>
{
  constructor(private menuRepository: MenuRepository) {}
  execute(
    params: StoreMenuUseCaseParams
  ): Observable<StoreMenuUseCaseResponse> {
    return this.menuRepository.store(params).pipe(
      map<Menu, StoreMenuUseCaseResponse>((element) => {
        return {
          menu: element,
        };
      })
    );
  }
}

export interface StoreMenuUseCaseParams {
  name: string;
  url: string;
}

export interface StoreMenuUseCaseResponse {
  menu: Menu;
}
