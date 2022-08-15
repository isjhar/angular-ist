import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import {
  GetRolesUseCaseService,
  GetRoleUseCaseResponse,
} from 'src/app/domain/use-cases/get-roles-use-case.service';
import { GetUseCaseParams } from 'src/app/domain/use-cases/use-case';
import {
  ServerSideTablePagination,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import { MenuRow } from '../menus/menus-table.service';

@Injectable()
export class RolesTableService extends ServerSideTableService<
  GetUseCaseParams,
  RoleRow
> {
  constructor(private getRolesUseCaseService: GetRolesUseCaseService) {
    super();
  }
  getParams() {
    return {
      limit: this.table.pageSize,
      page: this.table.pageIndex + 1,
      sort: this.table.sort,
      order: this.table.order,
      search: this.search,
    };
  }
  get(params: any): Observable<ServerSideTablePagination<any>> {
    return this.getRolesUseCaseService.execute(params).pipe(
      map<GetRoleUseCaseResponse, ServerSideTablePagination<RoleRow>>(
        (response) => {
          return {
            data: response.pagination.data.map<RoleRow>((element) => {
              return {
                id: element.id,
                name: element.name,
                menu_names: element.menus
                  .map((element) => element.name)
                  .join(', '),
                menus: element.menus.map<MenuRow>((element) => {
                  return {
                    id: element.id,
                    name: element.name,
                    url: element.url,
                  };
                }),
              };
            }),
            total: response.pagination.total,
          };
        }
      )
    );
  }
}

export interface RoleRow {
  id: number;
  name: string;
  menus: MenuRow[];
  menu_names: string;
}
