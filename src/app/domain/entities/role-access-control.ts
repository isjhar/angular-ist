export interface RoleAccessControl {
  name: string;
  accessControls: {
    id: string;
    name: string;
    description: string;
    value: boolean;
  }[];
}
