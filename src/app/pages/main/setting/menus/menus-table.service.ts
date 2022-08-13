import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import {
  GetMenusUseCaseResponse,
  GetMenusUseCaseService,
} from 'src/app/domain/usecases/get-menus-use-case.service';
import { GetUseCaseParams } from 'src/app/domain/usecases/use-case';
import {
  ServerSideTablePagination,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';

@Injectable()
export class MenusTableService extends ServerSideTableService<
  GetUseCaseParams,
  MenuRow
> {
  constructor(private getMenusUseCaseService: GetMenusUseCaseService) {
    super();
  }

  getParams(): GetUseCaseParams {
    return {
      limit: this.table.pageSize,
      page: this.table.pageIndex + 1,
      sort: this.table.sort,
      order: this.table.order,
      search: this.search,
    };
  }

  get(
    params: GetUseCaseParams
  ): Observable<ServerSideTablePagination<MenuRow>> {
    return this.getMenusUseCaseService.execute(params).pipe(
      map<GetMenusUseCaseResponse, ServerSideTablePagination<MenuRow>>(
        (element) => {
          return {
            data: element.pagination.data,
            total: element.pagination.total,
          };
        }
      )
    );
  }
}

export interface MenuRow {
  id: number;
  name: string;
  url: string;
}
