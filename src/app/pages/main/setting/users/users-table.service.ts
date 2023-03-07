import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_REPOSITORY } from 'src/app/token-repository.module';
import { GetUseCaseResponse } from 'src/app/domain/base-use-cases/get-use-case';
import { User } from 'src/app/domain/entities/user';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import { GetUsersUseCase } from 'src/app/domain/use-cases/get-users-use-case';
import {
  ServerSideTablePagination,
  GetServerSideTableParams,
  ServerSideTableService,
} from 'src/app/pages/shared/default-table/server-side-table/server-side-table.service';

@Injectable()
export class UsersTableService extends ServerSideTableService<
  GetServerSideTableParams,
  UserRow
> {
  getUsersUseCase: GetUsersUseCase;
  constructor(@Inject(USER_REPOSITORY) userRepository: UserRepository) {
    super();

    this.getUsersUseCase = new GetUsersUseCase(userRepository);
  }
  getParams(): GetServerSideTableParams {
    return {
      limit: this.table.pageSize,
      page: this.table.pageIndex + 1,
      sort: this.table.sort,
      order: this.table.order,
      search: this.search,
    };
  }
  get(
    params: GetServerSideTableParams
  ): Observable<ServerSideTablePagination<UserRow>> {
    return this.getUsersUseCase.execute(params).pipe(
      map<GetUseCaseResponse<User>, ServerSideTablePagination<UserRow>>(
        (element) => {
          return {
            total: element.pagination.total,
            data: element.pagination.data.map<UserRow>((element) => {
              let role_names = element.roles
                .map<String>((element) => element.name)
                .join(', ');
              return {
                id: element.id,
                email: element.email,
                name: element.name,
                role_names: role_names,
              };
            }),
          };
        }
      )
    );
  }
}

export interface UserRow {
  id: number;
  email: string;
  name: string;
  role_names: string;
}
