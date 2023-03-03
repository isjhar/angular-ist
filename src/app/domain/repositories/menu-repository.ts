import { Observable } from 'rxjs';
import { GetableRepository } from '../base-repositories/getable-repository';
import { Menu } from '../entities/menu';
import { PaginationParams } from '../entities/pagination-params';

export interface MenuRepository
  extends GetableRepository<PaginationParams, Menu> {
  findMenuByUrl(url: string): Observable<Menu>;
  isUrlAccessible(url: string): Observable<boolean>;
}
