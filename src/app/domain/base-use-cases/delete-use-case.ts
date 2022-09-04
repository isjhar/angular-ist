import { Observable } from 'rxjs';
import { DeletableRepository } from '../base-repositories/deletable-repository';
import { UseCase } from './use-case';

export class DeleteUseCase implements UseCase<DeleteUseCaseParams, void> {
  constructor(private deletableRepository: DeletableRepository) {}
  execute(params: DeleteUseCaseParams): Observable<void> {
    return this.deletableRepository.delete(params.id);
  }
}

export interface DeleteUseCaseParams {
  id: number;
}
