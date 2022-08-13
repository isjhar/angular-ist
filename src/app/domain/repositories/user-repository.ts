import { Observable } from 'rxjs';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { User } from '../entities/user';

export abstract class UserRepository {
  abstract get(params: PaginationParams): Observable<Pagination<User>>;
  abstract store(params: StoreUserRequestParams): Observable<User>;
  abstract update(id: number, params: StoreUserRequestParams): Observable<void>;
  abstract delete(id: number): Observable<void>;
}

export interface StoreUserRequestParams {
  email: string;
  name: string;
  password: string;
  roles: number[];
}
