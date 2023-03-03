import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { Role } from 'src/app/domain/entities/role';
import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';
import {
  GetRoleAccessControlsRequestParams,
  RoleRepository,
  StoreAccessControlRequestParams,
  StoreRoleRequestParams,
  UpdateRoleRequestParams,
} from 'src/app/domain/repositories/role-repository';
import { ApiResponse } from '../entities/api-response';
import { ApiUrlBuilder } from '../utilities/api-url-builder';

export class ApiRoleRepository implements RoleRepository {
  constructor(private http: HttpClient) {}

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
    throw new Error('Method not implemented.');
  }
  storeAccessControl(
    params: StoreAccessControlRequestParams
  ): Observable<void> {
    throw new Error('Method not implemented.');
  }
  deleteAccessControl(
    params: StoreAccessControlRequestParams
  ): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
