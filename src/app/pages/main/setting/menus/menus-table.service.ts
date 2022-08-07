import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationParams, ApiResponse, Pagination } from 'src/app/api';
import { ServerSideTableService } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import { MenusHttpService } from '../menus-http.service';

@Injectable()
export class MenusTableService extends ServerSideTableService {
  constructor(private httpService: MenusHttpService) {
    super();
  }
  getList(params: PaginationParams): Observable<ApiResponse<Pagination<any>>> {
    return this.httpService.getPerPage(params);
  }
  map(source: any) {
    return {
      id: source.id,
      name: source.name,
      url: source.url,
    };
  }
}
