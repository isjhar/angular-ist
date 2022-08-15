import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Menu } from '../entities/menu';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { MenuRepository } from '../repositories/menu-repository';
import { GetUseCaseParams, UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class GetMenusUseCaseService
  implements UseCase<GetUseCaseParams, GetMenusUseCaseResponse>
{
  constructor(private authRepository: MenuRepository) {}
  execute(params: GetUseCaseParams): Observable<GetMenusUseCaseResponse> {
    return this.authRepository.get(params).pipe(
      map<Pagination<Menu>, GetMenusUseCaseResponse>((element) => {
        return {
          pagination: element,
        };
      })
    );
  }
}

export interface GetMenusUseCaseResponse {
  pagination: Pagination<Menu>;
}
