export interface AdminDashboard {
  newUserTrends: UserTrend[];
  activeUserTrends: UserTrend[];
  userRoles: UserRole[];
}

export interface UserTrend {
  date: Date;
  total: number;
}

export interface UserRole {
  role: string;
  total: number;
}
