import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  ApiUrlBuilder,
  Pagination,
  PaginationParams,
} from 'src/app/api';
import { Menu } from './menu-http.service';

export interface Role {
  id: number;
  name: string;
  menus: Menu[];
}

interface RoleRequestParams {
  name: string;
  menus: number[];
}

@Injectable({
  providedIn: 'root',
})
export class RoleHttpService {
  constructor(private http: HttpClient) {}

  get(): Observable<ApiResponse<Pagination<Role>>> {
    return this.http.get<ApiResponse<Pagination<Role>>>('/api/roles');
  }

  getPerPage(
    params: PaginationParams
  ): Observable<ApiResponse<Pagination<Role>>> {
    let urlBuilder = new ApiUrlBuilder('/api/roles');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    return this.http.get<ApiResponse<Pagination<Role>>>(urlBuilder.getUrl());
  }

  store(params: RoleRequestParams): Observable<ApiResponse<Role>> {
    return this.http.post<ApiResponse<Role>>('/api/roles', params);
  }

  update(id: number, params: RoleRequestParams): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`/api/roles/${id}`, params);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`/api/roles/${id}`);
  }
}
