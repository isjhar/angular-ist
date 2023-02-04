import { AccessControl } from './access-control';

export interface RoleAccessControl {
  id: number;
  accessControl: AccessControl;
  isEnabled: boolean;
}
