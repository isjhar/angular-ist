import { Observable } from 'rxjs';

import { MenuRepository } from '../repositories/menu-repository';
import { UseCase } from './use-case';

export class UpdateMenuUseCaseService
  implements UseCase<UpdateMenuUseCaseParams, any>
{
  constructor(private menuRepository: MenuRepository) {}
  execute(params: UpdateMenuUseCaseParams): Observable<any> {
    return this.menuRepository.update(params.id, {
      name: params.name,
      url: params.url,
    });
  }
}

export interface UpdateMenuUseCaseParams {
  id: number;
  name: string;
  url: string;
}
