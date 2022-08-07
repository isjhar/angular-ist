import { Observable } from 'rxjs';
import { Menu } from '../entities/menu';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';

export abstract class MenuRepository {
  abstract get(params: PaginationParams): Observable<Pagination<Menu>>;
  abstract store(params: StoreMenuRequestParams): Observable<Menu>;
  abstract update(params: UpdateMenuRequestParams): Observable<any>;
  abstract delete(id: number): Observable<any>;
}

export interface StoreMenuRequestParams {
  name: string;
  url: string;
}

export interface UpdateMenuRequestParams extends StoreMenuRequestParams {
  id: number;
}
