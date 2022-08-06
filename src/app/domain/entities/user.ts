import { Role } from './role';

export interface User {
  email: string;
  name: string;
  role_names: string;
  roles: Role[];
}
