import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  ApiUrlBuilder,
  Pagination,
  PaginationParams,
} from 'src/app/api';

interface User {
  email: string;
  roles: UserRole[];
}

interface UserRole {
  id: number;
  name: string;
  menus: RoleMenu[];
}

interface RoleMenu {
  id: number;
  name: string;
  url?: string;
}

interface UserRequestParams {
  email: string;
  name: string;
  password: string;
  roles: number[];
}

export interface Role {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(
    params: PaginationParams
  ): Observable<ApiResponse<Pagination<User>>> {
    let urlBuilder = new ApiUrlBuilder('/api/users');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
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

  getRoles(): Observable<ApiResponse<Role[]>> {
    let urlBuilder = new ApiUrlBuilder('/api/roles');
    return this.http.get<ApiResponse<Role[]>>(urlBuilder.getUrl());
  }
}
