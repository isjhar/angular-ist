import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { GetRolesUseCaseService } from 'src/app/domain/usecases/get-roles-use-case.service';
import { ServerSideTableService } from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';

@Injectable()
export class RolesTableService extends ServerSideTableService {
  constructor(private getRolesUseCaseService: GetRolesUseCaseService) {
    super();
  }

  getList(params: PaginationParams): Observable<Pagination<any>> {
    return this.getRolesUseCaseService.execute(params);
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
