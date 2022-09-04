import { Observable } from 'rxjs';
import { UpdatableRepository } from '../base-repositories/updatable-repository';
import { UseCase } from './use-case';

export abstract class UpdateUseCase<
  Params extends UpdateUseCaseParams,
  RepoParams
> implements UseCase<Params, void>
{
  constructor(private updatableRepository: UpdatableRepository<RepoParams>) {}
  execute(params: Params): Observable<void> {
    let repoParams = this.mapParams(params);
    return this.updatableRepository.update(params.id, repoParams);
  }

  abstract mapParams(params: Params): RepoParams;
}

export interface UpdateUseCaseParams {
  id: number;
}
