import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FindableRepository } from '../base-repositories/findable-repository';
import { UseCase } from './use-case';

export class FindHouseUseCase<Result>
  implements UseCase<FindUseCaseParams, FindUseCaseResponse<Result>>
{
  constructor(private findableRepository: FindableRepository<Result>) {}
  execute(params: FindUseCaseParams): Observable<FindUseCaseResponse<Result>> {
    return this.findableRepository.find(params.id).pipe(
      map<Result, FindUseCaseResponse<Result>>((element) => {
        return {
          item: element,
        };
      })
    );
  }
}

export interface FindUseCaseParams {
  id: number;
}

export interface FindUseCaseResponse<Result> {
  item: Result;
}
