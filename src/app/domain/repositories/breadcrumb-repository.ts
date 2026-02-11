import { Observable } from 'rxjs';
import { GetableRepository } from '../base-repositories/getable-repository';
import { Breadcrumb } from '../entities/breadcrumb';
import { PaginationParams } from '../entities/pagination-params';

export interface BreadcrumbRepository
  extends GetableRepository<PaginationParams, Breadcrumb> {
  isUrlAccessible(url: string): Observable<boolean>;
  dynamicLabelDictChanges(): Observable<{ [key: string]: string }>;
  setDynamicLabelDict(data: { [key: string]: string }): void;
}
