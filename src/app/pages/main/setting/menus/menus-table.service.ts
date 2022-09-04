import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MENU_REPOSITORY } from 'src/app/app.module';
import { MenuRepository } from 'src/app/domain/repositories/menu-repository';
import { GetMenusUseCase } from 'src/app/domain/use-cases/get-menus-use-case';
import {
  ServerSideTablePagination,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import {
  GetUseCaseParams,
  GetUseCaseResponse,
} from 'src/app/domain/base-use-cases/get-use-case';
import { Menu } from 'src/app/domain/entities/menu';

@Injectable()
export class MenusTableService extends ServerSideTableService<
  GetUseCaseParams,
  MenuRow
> {
  getMenusUseCase: GetMenusUseCase;
  constructor(@Inject(MENU_REPOSITORY) menuRepository: MenuRepository) {
    super();

    this.getMenusUseCase = new GetMenusUseCase(menuRepository);
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
    return this.getMenusUseCase.execute(params).pipe(
      map<GetUseCaseResponse<Menu>, ServerSideTablePagination<MenuRow>>(
        (element) => {
          return {
            data: element.pagination.data.map<MenuRow>((element) => {
              return {
                id: element.id,
                name: element.name,
                url: element.url,
              };
            }),
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
