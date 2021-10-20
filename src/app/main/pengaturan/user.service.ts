import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ApiUrlBuilder, PaginationParams } from 'src/app/api';

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

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(params: PaginationParams): Observable<ApiResponse<any>> {
    let urlBuilder = new ApiUrlBuilder('/api/users');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    return this.http.get<ApiResponse<any>>(urlBuilder.getUrl());
  }
}
