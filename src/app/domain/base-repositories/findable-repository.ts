import { Observable } from 'rxjs';

export interface FindableRepository<Result> {
  find(id: number): Observable<Result>;
}
