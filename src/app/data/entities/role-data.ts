import { AccessControlData } from './access-control-data';

export interface RoleData {
  id: number;
  name: string;
  accessControls: AccessControlData[];
}
