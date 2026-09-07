import { RoleAccessControl } from 'src/app/domain/entities/role-access-control';

export interface RoleAccessControlData {
  name: string;
  accessControls: {
    key: number;
    name: string;
    description: string;
    value: boolean;
  }[];
}

export function mapRoleAccessControlData(
  data: RoleAccessControlData,
): RoleAccessControl {
  return {
    name: data.name,
    accessControls: data.accessControls.map((accessControl) => {
      return {
        id: accessControl.key,
        name: accessControl.name,
        description: accessControl.description,
        value: accessControl.value,
      };
    }),
  };
}
