import { Observable } from 'rxjs';
import { Menu } from '../entities/menu';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';

export abstract class MenuRepository {
  abstract get(params: PaginationParams): Observable<Pagination<Menu>>;
  abstract store(params: StoreMenuRequestParams): Observable<Menu>;
  abstract update(id: number, params: StoreMenuRequestParams): Observable<void>;
  abstract delete(id: number): Observable<void>;
}

export interface StoreMenuRequestParams {
  name: string;
  url: string;
}
