import { Observable } from 'rxjs';

export interface UpdatableRepository<Params> {
  update(id: number, params: Params): Observable<void>;
}
