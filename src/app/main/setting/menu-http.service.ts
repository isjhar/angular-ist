import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  ApiUrlBuilder,
  Pagination,
  PaginationParams,
} from 'src/app/api';

export interface Menu {
  id: number;
  name: string;
  url: string;
}

interface StoreRequestParams {}
@Injectable({
  providedIn: 'root',
})
export class MenuHttpService {
  constructor(private http: HttpClient) {}

  get(): Observable<ApiResponse<Pagination<Menu>>> {
    return this.http.get<ApiResponse<Pagination<Menu>>>('/api/menus');
  }

  getPerPage(
    params: PaginationParams
  ): Observable<ApiResponse<Pagination<Menu>>> {
    let urlBuilder = new ApiUrlBuilder('/api/menus');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    return this.http.get<ApiResponse<Pagination<Menu>>>(urlBuilder.getUrl());
  }

  store(params: StoreRequestParams): Observable<ApiResponse<Menu>> {
    return this.http.post<ApiResponse<Menu>>('/api/menus', params);
  }

  update(params: Menu): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>('/api/menus', params);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`/api/menus/${id}`);
  }
}
