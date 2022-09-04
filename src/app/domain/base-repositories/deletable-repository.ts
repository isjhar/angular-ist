import { Observable } from 'rxjs';

export interface DeletableRepository {
  delete(id: number): Observable<void>;
}
