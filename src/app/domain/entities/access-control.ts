export interface AccessControl {
  id: number;
  name: string;
  description: string;
}

export enum AccessControlId {
  Dashboard = 1,
  Setting = 2,
}
