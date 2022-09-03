import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MENU_REPOSITORY } from 'src/app/app.module';
import { MenuRepository } from '../repositories/menu-repository';
import { UseCase } from './use-case';

@Injectable({
  providedIn: 'root',
})
export class UpdateMenuUseCaseService
  implements UseCase<UpdateMenuUseCaseParams, any>
{
  constructor(
    @Inject(MENU_REPOSITORY) private menuRepository: MenuRepository
  ) {}
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
