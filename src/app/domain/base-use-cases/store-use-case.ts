import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorableRepository } from '../base-repositories/storeable-repository';
import { UseCase } from './use-case';

export abstract class StoreUseCase<Params, RepoParams, Result>
  implements UseCase<Params, StoreUseCaseResponse<Result>>
{
  constructor(
    private storeableRepository: StorableRepository<RepoParams, Result>
  ) {}

  execute(params: Params): Observable<StoreUseCaseResponse<Result>> {
    let mappedParams = this.mapParams(params);
    return this.storeableRepository.store(mappedParams).pipe(
      map<Result, StoreUseCaseResponse<Result>>((element) => {
        return {
          item: element,
        };
      })
    );
  }

  abstract mapParams(params: Params): RepoParams;
}

export interface StoreUseCaseResponse<Result> {
  item: Result;
}
