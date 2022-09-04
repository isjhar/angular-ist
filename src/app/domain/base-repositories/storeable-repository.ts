import { Observable } from 'rxjs';

export interface StorableRepository<Params, Result> {
  store(params: Params): Observable<Result>;
}
