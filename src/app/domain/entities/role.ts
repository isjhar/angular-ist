import { AccessControl } from './access-control';

export interface Role {
  id: number;
  name: string;
  accessControls: AccessControl[];
}
