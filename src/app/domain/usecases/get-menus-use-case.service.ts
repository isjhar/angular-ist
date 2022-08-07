import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../entities/menu';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { MenuRepository } from '../repositories/menu-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetMenusUseCaseService
  implements UseCase<PaginationParams, Pagination<Menu>>
{
  constructor(private authRepository: MenuRepository) {}
  execute(params: PaginationParams): Observable<Pagination<Menu>> {
    return this.authRepository.get(params);
  }
}
