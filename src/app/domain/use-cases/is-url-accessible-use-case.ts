import { Observable } from 'rxjs';
import { UseCase } from '../base-use-cases/use-case';
import { BreadcrumbRepository } from '../repositories/breadcrumb-repository';

export class IsUrlAccessibleUseCase implements UseCase<string, boolean> {
  constructor(private breadcrumbRepository: BreadcrumbRepository) {}

  execute(params: string): Observable<boolean> {
    return this.breadcrumbRepository.isUrlAccessible(params);
  }
}
