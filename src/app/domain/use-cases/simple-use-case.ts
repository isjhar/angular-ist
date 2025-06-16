import { Observable } from 'rxjs';

export abstract class SimpleUseCase<Params, Result> {
  abstract execute(params: Params): Observable<Result>;
}
