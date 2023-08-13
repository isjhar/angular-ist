import { Observable, of } from 'rxjs';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { JobRepository } from 'src/app/domain/repositories/job-repository';
import { Job } from 'src/app/domain/entities/job';

export class MockJobRepository implements JobRepository {
  static items: Job[] = [
    {
      id: 1,
      queue: 'default',
    },
  ];

  get(params: PaginationParams): Observable<Pagination<Job>> {
    let roles = [...MockJobRepository.items];
    let search = params.search;
    let limit = params.limit ? params.limit : roles.length;
    let page = params.page ? params.page : 0;

    if (search != undefined) {
      roles = roles.filter((element) =>
        element.queue.toLowerCase().includes(search?.toLowerCase() ?? '')
      );
    }
    let paginatedRoles = roles.splice((page - 1) * limit, limit);
    return of({ total: roles.length, data: paginatedRoles });
  }
}
