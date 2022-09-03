import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Menu } from '../entities/menu';
import { Pagination } from '../entities/pagination';
import { MenuRepository } from '../repositories/menu-repository';
import { GetUseCaseParams, UseCase } from './use-case';

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
