import { AccessControlId } from './access-control';

export interface Breadcrumb {
  name: string;
  url: string;
  accessControlId?: AccessControlId;
  childs?: Breadcrumb[];
}
