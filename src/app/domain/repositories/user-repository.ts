import { Observable } from 'rxjs';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { User } from '../entities/user';

export interface UserRepository {
  get(params: PaginationParams): Observable<Pagination<User>>;
  store(params: StoreUserRequestParams): Observable<User>;
  update(id: number, params: StoreUserRequestParams): Observable<void>;
  delete(id: number): Observable<void>;
}

export interface StoreUserRequestParams {
  email: string;
  name: string;
  password: string;
  roles: number[];
}
