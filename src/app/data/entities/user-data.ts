import { User } from 'src/app/domain/entities/user';
import { RoleData } from './role-data';

export interface UserData {
  id: number;
  name: string;
  email: string;
  roles: RoleData[];
}

export function mapUserData(data: UserData): User {
  var user = new User({
    id: data.id,
    name: data.name,
    email: data.email,
    password: '',
    roles: data.roles.map((role) => {
      return {
        id: role.id,
        name: role.name,
        accessControls: role.accessControls.map((accessControl) => {
          return {
            id: accessControl.id,
            name: accessControl.name,
            description: accessControl.description,
          };
        }),
      };
    }),
  });
  return user;
}
