import { Observable } from 'rxjs';
import { UseCase } from '../base-use-cases/use-case';
import { Menu } from '../entities/menu';
import { MenuRepository } from '../repositories/menu-repository';

export class FindMenuByUrlUseCase implements UseCase<string, Menu | undefined> {
  constructor(private menuRepository: MenuRepository) {}

  execute(params: string): Observable<Menu | undefined> {
    return this.menuRepository.findMenuByUrl(params);
  }
}
