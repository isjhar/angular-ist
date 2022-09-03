import { Observable } from 'rxjs';
import { Menu } from '../entities/menu';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';

export interface MenuRepository {
  get(params: PaginationParams): Observable<Pagination<Menu>>;
  store(params: StoreMenuRequestParams): Observable<Menu>;
  update(id: number, params: StoreMenuRequestParams): Observable<void>;
  delete(id: number): Observable<void>;
}

export interface StoreMenuRequestParams {
  name: string;
  url: string;
}
