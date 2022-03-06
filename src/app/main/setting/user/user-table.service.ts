import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationParams, ApiResponse, Pagination } from 'src/app/api';
import { ServerSideTableService } from 'src/app/shared/default-table/server-side-table/server-side-table.service';
import { UserHttpService } from '../user-http.service';

@Injectable()
export class UserTableService extends ServerSideTableService {
  constructor(private httpService: UserHttpService) {
    super();
  }
  getList(params: PaginationParams): Observable<ApiResponse<Pagination<any>>> {
    return this.httpService.getPerPage(params);
  }
  map(source: any) {
    return {
      id: source.id,
      name: source.name,
      email: source.email,
      role_names: source.role_names,
    };
  }
}
