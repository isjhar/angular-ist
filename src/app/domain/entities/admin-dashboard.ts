export interface AdminDashboard {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  newUserTrends: UserTrend[];
  activeUserTrends: UserTrend[];
  userRoles: UserRole[];
  dailyUserActivities: UserActivity;
  hourlyUserActivities: UserActivity;
}

export interface UserTrend {
  date: Date;
  total: number;
}

export interface UserRole {
  role: string;
  total: number;
}

export interface UserActivity {
  newActivties: number[];
  activeActivities: number[];
}
