import { Observable } from 'rxjs';
import { DeletableRepository } from '../base-repositories/deletable-repository';
import { GetableRepository } from '../base-repositories/getable-repository';
import { StorableRepository } from '../base-repositories/storeable-repository';
import { UpdatableRepository } from '../base-repositories/updatable-repository';
import { Pagination } from '../entities/pagination';
import { PaginationParams } from '../entities/pagination-params';
import { User } from '../entities/user';
import { UserList } from 'src/app/domain/entities/user-list';
import { UserDetail } from 'src/app/domain/entities/user-detail';

export interface UserRepository
  extends GetableRepository<PaginationParams, UserList>,
    StorableRepository<StoreUserRequestParams, UserList>,
    UpdatableRepository<UpdateUserRequestParams>,
    DeletableRepository {}

export interface StoreUserRequestParams {
  email: string;
  name: string;
  password: string;
  roles: number[];
}

export interface UpdateUserRequestParams {
  name: string;
  roles: number[];
}
