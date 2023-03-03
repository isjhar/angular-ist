import { Observable } from 'rxjs';
import { UseCase } from '../base-use-cases/use-case';
import { MenuRepository } from '../repositories/menu-repository';

export class IsUrlAccessibleUseCase implements UseCase<string, boolean> {
  constructor(private menuRepository: MenuRepository) {}

  execute(params: string): Observable<boolean> {
    return this.menuRepository.isUrlAccessible(params);
  }
}
