import { Observable } from 'rxjs';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { Role } from '../entities/role';

export interface RoleRepository {
  get(params: PaginationParams): Observable<Pagination<Role>>;
  store(params: StoreRoleRequestParams): Observable<Role>;
  update(id: number, params: StoreRoleRequestParams): Observable<void>;
  delete(id: number): Observable<void>;
}

export interface StoreRoleRequestParams {
  name: string;
  menus: number[];
}
