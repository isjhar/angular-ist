import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Menu } from 'src/app/domain/entities/menu';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import {
  MenuRepository,
  StoreMenuRequestParams,
  UpdateMenuRequestParams,
} from 'src/app/domain/repositories/menu-repository';
import { ApiResponse } from '../entities/api-response';

export class ApiMenuRepository extends MenuRepository {
  constructor(private http: HttpClient) {
    super();
  }

  get(params: PaginationParams): Observable<Pagination<Menu>> {
    return this.http.get<ApiResponse<Pagination<Menu>>>('/api/menus').pipe(
      catchError((response) => {
        throw response.error.message
          ? response.error.message
          : 'internal server error';
      }),
      map((e) => e.data)
    );
  }

  store(params: StoreMenuRequestParams): Observable<Menu> {
    return this.http
      .post<ApiResponse<Menu>>('/api/menus', params)
      .pipe(map((e) => e.data));
  }

  update(params: UpdateMenuRequestParams): Observable<any> {
    return this.http
      .patch<ApiResponse<any>>(`/api/menus/${params.id}`, params)
      .pipe(map((e) => e.data));
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http
      .delete<ApiResponse<any>>(`/api/menus/${id}`)
      .pipe(map((e) => e.data));
  }
}
