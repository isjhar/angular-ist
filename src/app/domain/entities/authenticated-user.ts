import { AccessControlId } from './access-control';
import { Role } from './role';

export class AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  roles: Role[];

  constructor(arg: { id: number; email: string; name: string; roles: Role[] }) {
    this.id = arg.id;
    this.email = arg.email;
    this.name = arg.name;
    this.roles = arg.roles;
  }

  hasAccessControl(accessControlId: AccessControlId): boolean {
    for (let index = 0; index < this.roles.length; index++) {
      const role = this.roles[index];
      let accessControl = role.accessControls.find(
        (accessControl) => accessControl.id == accessControlId,
      );
      if (accessControl != null) {
        return true;
      }
    }
    return false;
  }
}
