import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetableRepository } from '../base-repositories/getable-repository';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';

export abstract class GetUseCase<
  Params extends GetUseCaseParams,
  RepoParams extends PaginationParams,
  Result
> {
  constructor(
    private getableRepository: GetableRepository<RepoParams, Result>
  ) {}

  execute(params: Params): Observable<GetUseCaseResponse<Result>> {
    let mappedParams = this.mapParams(params);
    return this.getableRepository.get(mappedParams).pipe(
      map<Pagination<Result>, GetUseCaseResponse<Result>>((element) => {
        return { pagination: element };
      })
    );
  }

  abstract mapParams(params: Params): RepoParams;
}

export interface GetUseCaseParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
}

export interface GetUseCaseResponse<Result> {
  pagination: Pagination<Result>;
}
