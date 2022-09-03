import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MENU_REPOSITORY } from 'src/app/app.module';
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
  implements UseCase<StoreMenuUseCaseParams, StoreMenuUseCaseResponse>
{
  constructor(
    @Inject(MENU_REPOSITORY) private menuRepository: MenuRepository
  ) {}
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
