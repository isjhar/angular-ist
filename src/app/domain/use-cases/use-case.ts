import { Observable } from 'rxjs';

export interface UseCase<S, T> {
  execute(params: S): Observable<T>;
}

export interface GetUseCaseParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
}

export interface DeleteUseCaseParams {
  id: number;
}
