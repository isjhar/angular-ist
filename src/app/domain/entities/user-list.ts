export interface UserList {
  id: number;
  name: string;
  email: string;
  isEditable: boolean;
  roles: {
    id: number;
    name: string;
  }[];
}
