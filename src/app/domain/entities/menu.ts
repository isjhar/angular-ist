import { AccessControlId } from './access-control';

export interface Menu {
  name: string;
  url: string;
  isShow?: boolean;
  icon?: string;
  childs?: Menu[];
  accessControlId?: AccessControlId;
}
