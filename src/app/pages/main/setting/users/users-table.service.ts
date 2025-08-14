import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_REPOSITORY } from 'src/app/app-token-repository';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { UserList } from 'src/app/domain/entities/user-list';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import {
  ServerSideTablePagination,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';

@Injectable()
export class UsersTableService extends ServerSideTableService<
  PaginationParams,
  UserRow
> {
  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {
    super();
  }
  getParams(): PaginationParams {
    return {
      limit: this.table.pageSize,
      page: this.table.pageIndex,
      sort: this.table.sort,
      order: this.table.order,
      search: this.table.search,
    };
  }
  get(
    params: PaginationParams,
  ): Observable<ServerSideTablePagination<UserRow>> {
    return this.userRepository.get(params).pipe(
      map<Pagination<UserList>, ServerSideTablePagination<UserRow>>(
        (element) => {
          return {
            total: element.total,
            data: element.items.map<UserRow>((element) => {
              let role_names = element.roles
                .map<String>((element) => element.name)
                .join(', ');
              return {
                id: element.id,
                email: element.email,
                name: element.name,
                roleNames: role_names,
                isEditable: element.isEditable,
              };
            }),
          };
        },
      ),
    );
  }
}

export interface UserRow {
  id: number;
  email: string;
  name: string;
  roleNames: string;
  isEditable: boolean;
}
