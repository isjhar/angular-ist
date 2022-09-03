import { Observable } from 'rxjs';
import { MenuRepository } from '../repositories/menu-repository';
import { UseCase } from './use-case';

export class DeleteMenuUseCaseService
  implements UseCase<DeleteMenuUseCaseParams, void>
{
  constructor(private menuRepository: MenuRepository) {}
  execute(params: DeleteMenuUseCaseParams): Observable<any> {
    return this.menuRepository.delete(params.id);
  }
}

export interface DeleteMenuUseCaseParams {
  id: number;
}
