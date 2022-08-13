import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { Role } from 'src/app/domain/entities/role';
import {
  RoleRepository,
  StoreRoleRequestParams,
} from 'src/app/domain/repositories/role-repository';
import { ApiResponse } from '../entities/api-response';
import { ApiUrlBuilder } from '../utilities/api-url-builder';

export class ApiRoleRepository extends RoleRepository {
  constructor(private http: HttpClient) {
    super();
  }
  get(params: PaginationParams): Observable<Pagination<Role>> {
    let urlBuilder = new ApiUrlBuilder('/api/roles');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    return this.http
      .get<ApiResponse<Pagination<Role>>>(urlBuilder.getUrl())
      .pipe(
        catchError((response) => {
          throw response.error.message
            ? response.error.message
            : 'internal server error';
        }),
        map((e) => e.data)
      );
  }
  store(params: StoreRoleRequestParams): Observable<Role> {
    return this.http
      .post<ApiResponse<Role>>('/api/roles', params)
      .pipe(map((e) => e.data));
  }
  update(id: number, params: StoreRoleRequestParams): Observable<any> {
    return this.http
      .patch<ApiResponse<any>>(`/api/roles/${id}`, params)
      .pipe(map((e) => e.data));
  }
  delete(id: number): Observable<any> {
    return this.http
      .delete<ApiResponse<any>>(`/api/roles/${id}`)
      .pipe(map((e) => e.data));
  }
}
