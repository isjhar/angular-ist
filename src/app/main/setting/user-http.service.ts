import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  ApiUrlBuilder,
  Pagination,
  PaginationParams,
} from 'src/app/api';
import { Role } from './role-http.service';

interface User {
  email: string;
  name: string;
  role_names: string;
  roles: Role[];
}

interface UserRequestParams {
  email: string;
  name: string;
  password: string;
  roles: number[];
}

@Injectable({ providedIn: 'root' })
export class UserHttpService {
  constructor(private http: HttpClient) {}

  getPerPage(
    params: PaginationParams
  ): Observable<ApiResponse<Pagination<User>>> {
    let urlBuilder = new ApiUrlBuilder('/api/users');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    urlBuilder.pushQueryParam('sort', params.sort);
    urlBuilder.pushQueryParam('order', params.order);
    return this.http.get<ApiResponse<any>>(urlBuilder.getUrl());
  }

  storeUser(params: UserRequestParams): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>('/api/users/', params);
  }

  updateUser(params: User): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>('/api/users/', params);
  }

  deleteUser(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`/api/users/${id}`);
  }
}
