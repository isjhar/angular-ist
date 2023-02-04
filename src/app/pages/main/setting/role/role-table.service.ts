import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ROLE_ACCESS_CONTROL_REPOSITORY,
  ROLE_REPOSITORY,
} from 'src/app/app.module';
import {
  GetUseCaseParams,
  GetUseCaseResponse,
} from 'src/app/domain/base-use-cases/get-use-case';
import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';
import { RoleAccessControlRepository } from 'src/app/domain/repositories/role-access-control-repository';
import { GetRoleAccessControlsUseCase } from 'src/app/domain/use-cases/get-role-access-controls-use-case';
import {
  ServerSideTablePagination,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';

@Injectable()
export class RoleTableService extends ServerSideTableService<
  GetUseCaseParams,
  RoleAccessControlRow
> {
  getRoleAccessControlUseCase: GetRoleAccessControlsUseCase;
  constructor(
    @Inject(ROLE_ACCESS_CONTROL_REPOSITORY)
    roleAccessControlRepository: RoleAccessControlRepository
  ) {
    super();

    this.getRoleAccessControlUseCase = new GetRoleAccessControlsUseCase(
      roleAccessControlRepository
    );
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
    return this.getRoleAccessControlUseCase.execute(params).pipe(
      map<
        GetUseCaseResponse<RoleAccessControl>,
        ServerSideTablePagination<RoleAccessControlRow>
      >((response) => {
        return {
          data: response.pagination.data.map<RoleAccessControlRow>(
            (element) => {
              return {
                id: element.id,
                name: element.accessControl.name,
                accessControlId: element.accessControl.id,
              };
            }
          ),
          total: response.pagination.total,
        };
      })
    );
  }
}

export interface RoleAccessControlRow {
  id?: number;
  name: string;
  accessControlId: number;
}
