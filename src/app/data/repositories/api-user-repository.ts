import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { User } from 'src/app/domain/entities/user';
import {
  ChangePasswordRequestParams,
  StoreUserRequestParams,
  UpdateUserRequestParams,
  UserRepository,
} from 'src/app/domain/repositories/user-repository';
import { ApiResponse } from '../entities/api-response';
import { mapUserData, UserData } from '../entities/user-data';
import { ApiUrlBuilder } from '../utilities/api-url-builder';
import { toApiPageIndex } from 'src/app/data/utilities/api-param-modifier';
import { UserList } from 'src/app/domain/entities/user-list';

@Injectable()
export class ApiUserRepository implements UserRepository {
  constructor(private http: HttpClient) {}
  get(params: PaginationParams): Observable<Pagination<UserList>> {
    let urlBuilder = new ApiUrlBuilder('/api/users');
    urlBuilder.pushQueryParam('page', toApiPageIndex(params.page));
    urlBuilder.pushQueryParam('limit', params.limit);
    urlBuilder.pushQueryParam('sort', params.sort);
    urlBuilder.pushQueryParam('order', params.order);
    urlBuilder.pushQueryParam('search', params.search);
    return this.http
      .get<ApiResponse<Pagination<UserList>>>(urlBuilder.getUrl())
      .pipe(
        map<ApiResponse<Pagination<UserList>>, Pagination<UserList>>(
          (response) => {
            return {
              total: response.data.total,
              items: response.data.items,
            };
          },
        ),
      );
  }
  store(params: StoreUserRequestParams): Observable<UserList> {
    return this.http
      .post<ApiResponse<UserList>>('/api/users', params)
      .pipe(map<ApiResponse<UserList>, UserList>((response) => response.data));
  }

  update(id: number, params: UpdateUserRequestParams): Observable<void> {
    return this.http
      .patch<ApiResponse<void>>(`/api/users/${id}`, params)
      .pipe(map<ApiResponse<void>, void>((response) => response.data));
  }
  delete(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`/api/users/${id}`)
      .pipe(map<ApiResponse<void>, void>((response) => response.data));
  }

  changePassword(params: ChangePasswordRequestParams): Observable<void> {
    return this.http
      .patch<ApiResponse<void>>(`/api/users/${params.id}/change-password`, {
        password: params.password,
      })
      .pipe(map<ApiResponse<void>, void>((response) => response.data));
  }
}
