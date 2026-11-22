export interface AccessControl {
  id: string;
  name: string;
  description: string;
}

export enum AccessControlId {
  ViewUser = 'view-user',
  CreateUser = 'create-user',
  EditUser = 'edit-user',
  DeleteUser = 'delete-user',
  ViewRole = 'view-role',
  CreateRole = 'create-role',
  EditRole = 'edit-role',
  DeleteRole = 'delete-role',
}
