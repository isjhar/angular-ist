import { Observable } from 'rxjs';
import { AdminDashboard } from 'src/app/domain/entities/admin-dashboard';

export interface AdminDashboardRepository {
  get(params: GetAdminDashboardParams): Observable<AdminDashboard>;
}

export interface GetAdminDashboardParams {
  startDate: Date;
  endDate: Date;
}
