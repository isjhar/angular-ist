import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { User } from 'src/app/domain/entities/user';
import {
  StoreUserRequestParams,
  UserRepository,
} from 'src/app/domain/repositories/user-repository';
import { ApiResponse } from '../entities/api-response';
import { ApiUrlBuilder } from '../utilities/api-url-builder';

export class ApiUserRepository extends UserRepository {
  constructor(private http: HttpClient) {
    super();
  }
  get(params: PaginationParams): Observable<Pagination<User>> {
    let urlBuilder = new ApiUrlBuilder('/api/users');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    urlBuilder.pushQueryParam('sort', params.sort);
    urlBuilder.pushQueryParam('order', params.order);
    return this.http
      .get<ApiResponse<Pagination<User>>>(urlBuilder.getUrl())
      .pipe(
        map<ApiResponse<Pagination<User>>, Pagination<User>>(
          (response) => response.data
        )
      );
  }
  store(params: StoreUserRequestParams): Observable<User> {
    return this.http
      .post<ApiResponse<User>>('/api/users/', params)
      .pipe(map<ApiResponse<User>, User>((response) => response.data));
  }
  update(id: number, params: StoreUserRequestParams): Observable<void> {
    return this.http
      .patch<ApiResponse<void>>('/api/users/${id}', params)
      .pipe(map<ApiResponse<void>, void>((response) => response.data));
  }
  delete(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`/api/users/${id}`)
      .pipe(map<ApiResponse<void>, void>((response) => response.data));
  }
}
