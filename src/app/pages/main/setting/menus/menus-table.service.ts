import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { GetMenusUseCaseService } from 'src/app/domain/usecases/get-menus-use-case.service';
import {
  GetServerSideTablePagination,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';

@Injectable()
export class MenusTableService extends ServerSideTableService<any, any> {
  constructor(private getMenusUseCaseService: GetMenusUseCaseService) {
    super();
  }
  getParams() {
    throw new Error('Method not implemented.');
  }
  get(params: any): Observable<GetServerSideTablePagination<any>> {
    throw new Error('Method not implemented.');
  }
  getList(params: PaginationParams): Observable<Pagination<any>> {
    return this.getMenusUseCaseService.execute(params);
  }

  map(source: any) {
    return {
      id: source.id,
      name: source.name,
      url: source.url,
    };
  }
}
