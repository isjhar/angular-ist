import { Observable } from 'rxjs';
import { AdminDashboard } from 'src/app/domain/entities/admin-dashboard';
import {
  AdminDashboardRepository,
  GetAdminDashboardParams,
} from 'src/app/domain/repositories/admin-dashboard-repository';

export class MockAdminDashboardRepository implements AdminDashboardRepository {
  get(params: GetAdminDashboardParams): Observable<AdminDashboard> {
    return new Observable<AdminDashboard>((observer) => {
      const dates: Date[] = [];
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const startDate = params.startDate;
      const endDate = params.endDate;
      const totalDay = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      for (let index = totalDay; index > 0; index--) {
        const date = new Date();
        date.setDate(date.getDate() - index);
        dates.push(date);
      }

      const roles = ['Sys Admin', 'Admin', 'Employement'];

      observer.next({
        userRoles: roles.map((r, index) => {
          return {
            role: r,
            total: Math.floor(Math.random() * (index < 2 ? 100 : 1000) + 1),
          };
        }),
        newUserTrends: dates.map((d, index) => {
          return {
            date: d,
            total: Math.floor(Math.random() * (index < 2 ? 100 : 1000) + 1),
          };
        }),
        activeUserTrends: dates.map((d, index) => {
          return {
            date: d,
            total: Math.floor(Math.random() * (index < 2 ? 100 : 1000) + 1),
          };
        }),
      });
    });
  }
}
