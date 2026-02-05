import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessControl } from 'src/app/domain/entities/access-control';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import {
  AccessControlRepository,
  StoreAccessControlRequestParams,
} from 'src/app/domain/repositories/access-control-repository';
import { ApiResponse } from '../entities/api-response';
import { ApiUrlBuilder } from '../utilities/api-url-builder';
import { toApiPageIndex } from 'src/app/data/utilities/api-param-modifier';

@Injectable()
export class ApiAccessControlRepository implements AccessControlRepository {
  constructor(private http: HttpClient) {}

  get(params: PaginationParams): Observable<Pagination<AccessControl>> {
    let urlBuilder = new ApiUrlBuilder('/api/access-controls');
    urlBuilder.pushQueryParam('page', toApiPageIndex(params.page));
    urlBuilder.pushQueryParam('limit', params.limit);
    return this.http
      .get<ApiResponse<Pagination<AccessControl>>>(urlBuilder.getUrl())
      .pipe(
        map<ApiResponse<Pagination<AccessControl>>, Pagination<AccessControl>>(
          (e) => e.data,
        ),
      );
  }
  store(params: StoreAccessControlRequestParams): Observable<AccessControl> {
    throw new Error('Method not implemented.');
  }
  update(
    id: number,
    params: StoreAccessControlRequestParams,
  ): Observable<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
