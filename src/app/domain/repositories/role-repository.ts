import { Observable } from 'rxjs';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { Role } from '../entities/role';

export abstract class RoleRepository {
  abstract get(params: PaginationParams): Observable<Pagination<Role>>;
  abstract store(params: StoreRoleRequestParams): Observable<Role>;
  abstract update(params: UpdateRoleRequestParams): Observable<any>;
  abstract delete(id: number): Observable<any>;
}

export interface StoreRoleRequestParams {
  name: string;
  menus: number[];
}

export interface UpdateRoleRequestParams extends StoreRoleRequestParams {
  id: number;
}
