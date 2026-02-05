import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROLE_REPOSITORY } from 'src/app/app-token-repository';
import { Pagination } from 'src/app/domain/entities/pagination';
import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { GetRoleAccessControlsUseCaseParams } from 'src/app/domain/use-cases/get-role-access-controls-use-case';
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
  constructor(
    @Inject(ROLE_REPOSITORY)
    private roleRepository: RoleRepository,
    private route: ActivatedRoute,
  ) {
    super();

    if (this.route.snapshot.paramMap.has('id')) {
      this.roleId = parseInt(this.route.snapshot.paramMap.get('id')!);
    }
  }
  getParams(): GetRoleAccessControlsUseCaseParams {
    return {
      limit: this.table.pageSize,
      page: this.table.pageIndex,
      sort: this.table.sort,
      order: this.table.order,
      search: this.table.search,
      roleId: this.roleId,
    };
  }
  get(params: any): Observable<ServerSideTablePagination<any>> {
    return this.roleRepository.getRoleAccessControls(params).pipe(
      map<
        Pagination<RoleAccessControl>,
        ServerSideTablePagination<RoleAccessControlRow>
      >((response) => {
        return {
          data: response.items.map<RoleAccessControlRow>((element) => {
            return {
              id: element.id,
              name: element.accessControl.name,
              description: element.accessControl.description,
              accessControlId: element.accessControl.id,
            };
          }),
          total: response.total,
        };
      }),
    );
  }
}

export interface RoleAccessControlRow {
  id?: number;
  name: string;
  accessControlId: number;
  description: string;
}
