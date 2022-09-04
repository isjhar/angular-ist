import { Observable } from 'rxjs';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';

export interface GetableRepository<Params extends PaginationParams, Result> {
  get(params: Params): Observable<Pagination<Result>>;
}
