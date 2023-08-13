import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Job } from 'src/app/domain/entities/job';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { JobRepository } from 'src/app/domain/repositories/job-repository';
import { ApiResponse } from '../entities/api-response';
import { ApiUrlBuilder } from '../utilities/api-url-builder';
import { JobData, mapJobData } from '../entities/job-data';

@Injectable()
export class ApiJobRepository implements JobRepository {
  constructor(private http: HttpClient) {}
  get(params: PaginationParams): Observable<Pagination<Job>> {
    let urlBuilder = new ApiUrlBuilder('/api/jobs');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    urlBuilder.pushQueryParam('search', params.search);
    return this.http
      .get<ApiResponse<Pagination<JobData>>>(urlBuilder.getUrl())
      .pipe(
        map<ApiResponse<Pagination<JobData>>, Pagination<Job>>((response) => {
          return {
            total: response.data.total,
            data: response.data.data.map(mapJobData),
          };
        })
      );
  }
}
