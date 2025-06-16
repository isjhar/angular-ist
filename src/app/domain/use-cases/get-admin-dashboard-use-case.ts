import { Observable } from 'rxjs';
import { AdminDashboard } from 'src/app/domain/entities/admin-dashboard';
import {
  AdminDashboardRepository,
  GetAdminDashboardParams,
} from 'src/app/domain/repositories/admin-dashboard-repository';

export class GetAdminDashboardUseCase {
  constructor(private adminDashboardRepository: AdminDashboardRepository) {}
  execute(params: GetAdminDashboardParams): Observable<AdminDashboard> {
    return this.adminDashboardRepository.get(params);
  }
}
