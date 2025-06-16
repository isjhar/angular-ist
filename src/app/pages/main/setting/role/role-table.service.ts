import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROLE_REPOSITORY } from 'src/app/app-token-repository';
import { GetUseCaseResponse } from 'src/app/domain/base-use-cases/get-use-case';
import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import {
  GetRoleAccessControlsUseCase,
  GetRoleAccessControlsUseCaseParams,
} from 'src/app/domain/use-cases/get-role-access-controls-use-case';
import {
  ServerSideTablePagination,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';

@Injectable()
export class RoleTableService extends ServerSideTableService<
  GetRoleAccessControlsUseCaseParams,
  RoleAccessControlRow
> {
  roleId: number = 0;
  getRoleAccessControlUseCase: GetRoleAccessControlsUseCase;
  constructor(
    @Inject(ROLE_REPOSITORY)
    roleRepository: RoleRepository,
    private route: ActivatedRoute
  ) {
    super();

    this.getRoleAccessControlUseCase = new GetRoleAccessControlsUseCase(
      roleRepository
    );
    if (this.route.snapshot.paramMap.has('id')) {
      this.roleId = parseInt(this.route.snapshot.paramMap.get('id')!);
    }
  }
  getParams(): GetRoleAccessControlsUseCaseParams {
    return {
      limit: this.table.pageSize,
      page: this.table.pageIndex + 1,
      sort: this.table.sort,
      order: this.table.order,
      search: this.search,
      roleId: this.roleId,
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
