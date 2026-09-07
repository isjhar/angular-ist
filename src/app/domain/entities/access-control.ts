export interface AccessControl {
  id: number;
  name: string;
  description: string;
}

export enum AccessControlId {
  ViewUser = 1,
  AddUser = 2,
  EditUser = 3,
  DeleteUser = 4,
  ViewRole = 5,
  AddRole = 6,
  EditRole = 7,
  DeleteRole = 8,
}
