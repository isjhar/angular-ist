export interface AccessControl {
  id: number;
  name: string;
  description: string;
}

export enum AccessControlId {
  ViewDashboard = 1,
  ViewAccessControl = 2,
  ViewRole = 3,
  AddRole = 4,
  EditRole = 5,
  DeleteRole = 6,
  ViewUser = 7,
  AddUser = 8,
  EditUser = 9,
  DeleteUser = 10,
}
