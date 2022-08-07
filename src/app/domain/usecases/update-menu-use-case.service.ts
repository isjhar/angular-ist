import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MenuRepository,
  StoreMenuRequestParams,
  UpdateMenuRequestParams,
} from '../repositories/menu-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuUseCaseService
  implements UseCase<UpdateMenuRequestParams, any>
{
  constructor(private menuRepository: MenuRepository) {}
  execute(params: UpdateMenuRequestParams): Observable<any> {
    return this.menuRepository.update(params);
  }
}
