import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import {
  MenuRepository,
  StoreMenuRequestParams,
} from 'src/app/domain/repositories/menu-repository';
import { ApiResponse } from '../entities/api-response';
import { ApiUrlBuilder } from '../utilities/api-url-builder';

export class ApiMenuRepository extends MenuRepository {
  constructor(private http: HttpClient) {
    super();
  }

  get(params: PaginationParams): Observable<Pagination<Menu>> {
    let urlBuilder = new ApiUrlBuilder('/api/menus');
    urlBuilder.pushQueryParam('page', params.page);
    urlBuilder.pushQueryParam('limit', params.limit);
    return this.http
      .get<ApiResponse<Pagination<Menu>>>(urlBuilder.getUrl())
      .pipe(
        map<ApiResponse<Pagination<Menu>>, Pagination<Menu>>((e) => e.data)
      );
  }

  store(params: StoreMenuRequestParams): Observable<Menu> {
    return this.http
      .post<ApiResponse<Menu>>('/api/menus', params)
      .pipe(map<ApiResponse<Menu>, Menu>((e) => e.data));
  }

  update(id: number, params: StoreMenuRequestParams): Observable<void> {
    return this.http
      .patch<ApiResponse<void>>(`/api/menus/${id}`, params)
      .pipe(map<ApiResponse<void>, void>((e) => e.data));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<ApiResponse<void>>(`/api/menus/${id}`)
      .pipe(map<ApiResponse<void>, void>((e) => e.data));
  }
}
