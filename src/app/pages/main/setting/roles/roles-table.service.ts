import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROLE_REPOSITORY } from 'src/app/app-token-repository';
import {
  GetUseCaseParams,
  GetUseCaseResponse,
} from 'src/app/domain/base-use-cases/get-use-case';
import { Role } from 'src/app/domain/entities/role';
import { RoleList } from 'src/app/domain/entities/role-list';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { GetRolesUseCase } from 'src/app/domain/use-cases/get-roles-use-case';
import {
  ServerSideTablePagination,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';

@Injectable()
export class RolesTableService extends ServerSideTableService<
  GetUseCaseParams,
  RoleRow
> {
  getRolesUseCase: GetRolesUseCase;
  constructor(@Inject(ROLE_REPOSITORY) roleRepository: RoleRepository) {
    super();

    this.getRolesUseCase = new GetRolesUseCase(roleRepository);
  }
  getParams() {
    return {
      limit: this.table.pageSize,
      page: this.table.pageIndex,
      sort: this.table.sort,
      order: this.table.order,
      search: this.table.search,
    };
  }
  get(params: any): Observable<ServerSideTablePagination<any>> {
    return this.getRolesUseCase.execute(params).pipe(
      map<GetUseCaseResponse<RoleList>, ServerSideTablePagination<RoleRow>>(
        (response) => {
          return {
            data: response.pagination.items.map<RoleRow>((element) => {
              return {
                id: element.id,
                name: element.name,
                isEditable: element.isEditable,
              };
            }),
            total: response.pagination.total,
          };
        },
      ),
    );
  }
}

export interface RoleRow {
  id: number;
  name: string;
  isEditable: boolean;
}
