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

interface Role {
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

  getRoles(): Observable<ApiResponse<Role[]>> {
    let urlBuilder = new ApiUrlBuilder('/api/roles');
    return this.http.get<ApiResponse<Role[]>>(urlBuilder.getUrl());
  }
}
