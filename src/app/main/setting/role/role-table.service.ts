import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationParams, ApiResponse, Pagination } from 'src/app/api';
import { ServerSideTableService } from 'src/app/shared/default-table/server-side-table/server-side-table.service';
import { RoleHttpService } from '../role-http.service';

@Injectable()
export class RoleTableService extends ServerSideTableService {
  constructor(private httpService: RoleHttpService) {
    super();
  }

  getList(params: PaginationParams): Observable<ApiResponse<Pagination<any>>> {
    return this.httpService.getPerPage(params);
  }

  map(source: any) {
    return {
      id: source.id,
      name: source.name,
      menus: source.menus,
      menu_names: source.menus.map((menu: any) => menu.name).join(', '),
    };
  }
}
