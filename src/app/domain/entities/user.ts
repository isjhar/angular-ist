import { AccessControlId } from './access-control';
import { Role } from './role';

export class User {
  id: number;
  email: string;
  name: string;
  roles: Role[];
  password: string;

  constructor(arg: {
    id: number;
    email: string;
    name: string;
    roles: Role[];
    password: string;
  }) {
    this.id = arg.id;
    this.email = arg.email;
    this.name = arg.name;
    this.roles = arg.roles;
    this.password = arg.password;
  }

  hasAccessControl(accessControlId: AccessControlId): boolean {
    for (let index = 0; index < this.roles.length; index++) {
      const role = this.roles[index];
      let accessControl = role.accessControls.find(
        (accessControl) => accessControl.id == accessControlId
      );
      if (accessControl != null) {
        return true;
      }
    }
    return false;
  }
}
