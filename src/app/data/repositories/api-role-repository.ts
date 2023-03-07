import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { Role } from 'src/app/domain/entities/role';
import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';
import {
  DeleteAccessControlRequestParams,
  GetRoleAccessControlsRequestParams,
  RoleRepository,
  StoreAccessControlRequestParams,
  StoreRoleRequestParams,
  UpdateRoleRequestParams,
} from 'src/app/domain/repositories/role-repository';
import { ApiResponse } from '../entities/api-response';
import { ApiUrlBuilder } from '../utilities/api-url-builder';

@Injectable()
export class ApiRoleRepository implements RoleRepository {
  constructor(private http: HttpClient) {}
  find(id: number): Observable<Role> {
    return this.http
      .get<ApiResponse<Role>>(`/api/roles/${id}`)
      .pipe(map<ApiResponse<Role>, Role>((e) => e.data));
  }

  get(params: PaginationParams): Observable<Pagination<Role>> {
    let urlBuilder = new ApiUrlBuilder('/api/roles');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    return this.http
      .get<ApiResponse<Pagination<Role>>>(urlBuilder.getUrl())
      .pipe(
        map<ApiResponse<Pagination<Role>>, Pagination<Role>>((e) => e.data)
      );
  }
  store(params: StoreRoleRequestParams): Observable<Role> {
    return this.http
      .post<ApiResponse<Role>>('/api/roles', params)
      .pipe(map<ApiResponse<Role>, Role>((e) => e.data));
  }
  update(id: number, params: UpdateRoleRequestParams): Observable<void> {
    return this.http
      .patch<ApiResponse<void>>(`/api/roles/${id}`, params)
      .pipe(map<ApiResponse<void>, void>((e) => e.data));
  }
  delete(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`/api/roles/${id}`)
      .pipe(map<ApiResponse<void>, void>((e) => e.data));
  }

  getRoleAccessControls(
    params: GetRoleAccessControlsRequestParams
  ): Observable<Pagination<RoleAccessControl>> {
    let urlBuilder = new ApiUrlBuilder(
      `/api/roles/${params.roleId}/access-controls`
    );
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    return this.http
      .get<ApiResponse<Pagination<any>>>(urlBuilder.getUrl())
      .pipe(
        map<ApiResponse<Pagination<any>>, Pagination<RoleAccessControl>>(
          (e) => {
            return {
              data: e.data.data.map((x) => {
                return {
                  id: x.roleId,
                  accessControl: {
                    id: x.id,
                    name: x.name,
                    description: x.description,
                  },
                };
              }),
              total: e.data.total,
            };
          }
        )
      );
  }

  storeAccessControl(
    params: StoreAccessControlRequestParams
  ): Observable<void> {
    return this.http
      .post<ApiResponse<void>>(
        `/api/roles/${params.roleId}/access-controls`,
        params
      )
      .pipe(map<ApiResponse<void>, void>((e) => e.data));
  }

  deleteAccessControl(
    params: DeleteAccessControlRequestParams
  ): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(
        `/api/roles/${params.roleId}/access-controls/${params.accessControlId}`
      )
      .pipe(map<ApiResponse<void>, void>((e) => e.data));
  }
}
