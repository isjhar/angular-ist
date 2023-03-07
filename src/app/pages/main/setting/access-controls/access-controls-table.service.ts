import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ACCESS_CONTROL_REPOSITORY } from 'src/app/token-repository.module';
import {
  ServerSideTablePagination,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';
import {
  GetUseCaseParams,
  GetUseCaseResponse,
} from 'src/app/domain/base-use-cases/get-use-case';
import { GetAccessControlsUseCase } from 'src/app/domain/use-cases/get-access-controls-use-case';
import { AccessControlRepository } from 'src/app/domain/repositories/access-control-repository';
import { AccessControl } from 'src/app/domain/entities/access-control';

@Injectable()
export class AccessControlsTableService extends ServerSideTableService<
  GetUseCaseParams,
  AccessControlRow
> {
  getAccessControlsUseCase: GetAccessControlsUseCase;
  constructor(
    @Inject(ACCESS_CONTROL_REPOSITORY) menuRepository: AccessControlRepository
  ) {
    super();

    this.getAccessControlsUseCase = new GetAccessControlsUseCase(
      menuRepository
    );
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
  ): Observable<ServerSideTablePagination<AccessControlRow>> {
    return this.getAccessControlsUseCase.execute(params).pipe(
      map<
        GetUseCaseResponse<AccessControl>,
        ServerSideTablePagination<AccessControlRow>
      >((element) => {
        return {
          data: element.pagination.data.map<AccessControlRow>((element) => {
            return {
              id: element.id,
              name: element.name,
              description: element.description,
            };
          }),
          total: element.pagination.total,
        };
      })
    );
  }
}

export interface AccessControlRow {
  id: number;
  name: string;
  description: string;
}
