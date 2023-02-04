import { Observable, of } from 'rxjs';
import {
  RoleAccessControlRepository,
  StoreRoleAccessControlRequestParams,
} from 'src/app/domain/repositories/role-access-control-repository';
import { RoleAccessControlData } from '../entities/role-access-control-data';

export class MockRoleAccessControlRepository
  implements RoleAccessControlRepository
{
  static items: RoleAccessControlData[] = [
    {
      id: 1,
      roleId: 1,
      accessControlId: 1,
    },
    {
      id: 2,
      roleId: 1,
      accessControlId: 2,
    },
    {
      id: 3,
      roleId: 2,
      accessControlId: 1,
    },
    {
      id: 4,
      roleId: 2,
      accessControlId: 2,
    },
  ];

  store(params: StoreRoleAccessControlRequestParams): Observable<void> {
    return new Observable<void>((observer) => {
      let maxId = Math.max(
        ...MockRoleAccessControlRepository.items.map((element) => element.id)
      );
      let accessControl: RoleAccessControlData = {
        id: maxId + 1,
        accessControlId: params.accessControlId,
        roleId: params.roleId,
      };
      MockRoleAccessControlRepository.items.push(accessControl);
      observer.next();
      observer.complete();
    });
  }
  delete(id: number): Observable<void> {
    return new Observable<any>((observer) => {
      MockRoleAccessControlRepository.items =
        MockRoleAccessControlRepository.items.filter(
          (element) => element.id != id
        );
      observer.next();
      observer.complete();
    });
  }
}
