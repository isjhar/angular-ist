export interface RoleAccessControl {
  name: string;
  accessControls: {
    id: number;
    name: string;
    description: string;
    value: boolean;
  }[];
}
