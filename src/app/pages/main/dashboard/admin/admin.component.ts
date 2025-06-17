import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ADMIN_DASHBOARD_REPOSITORY } from 'src/app/app-token-repository';

import { DefaultNumberPipe } from '../../../shared/text/default-number.pipe';
import { UserActivityInHourComponent } from 'src/app/pages/main/dashboard/admin/user-activity-in-hour/user-activity-in-hour.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { UserTrendsComponent } from 'src/app/pages/main/dashboard/admin/user-trends/user-trends.component';
import 'chartjs-adapter-date-fns';
import { UserRolesComponent } from 'src/app/pages/main/dashboard/admin/user-roles/user-roles.component';
import { GetAdminDashboardUseCase } from 'src/app/domain/use-cases/get-admin-dashboard-use-case';
import { FilterService } from 'src/app/pages/main/dashboard/filter.service';
import { AdminDashboard } from 'src/app/domain/entities/admin-dashboard';

@Component({
  selector: 'app-admin',
  imports: [
    MatCardModule,
    DefaultNumberPipe,
    UserActivityInHourComponent,
    MatSlideToggle,
    UserTrendsComponent,
    UserRolesComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
})
export class AdminComponent implements OnInit {
  adminDashboard = signal<AdminDashboard>({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
    newUserTrends: [],
    activeUserTrends: [],
    userRoles: [],
    dailyUserActivities: {
      activeActivities: [],
      newActivties: [],
    },
    hourlyUserActivities: {
      activeActivities: [],
      newActivties: [],
    },
  });

  private _filterService = inject(FilterService);
  private _adminDashboardRepository = inject(ADMIN_DASHBOARD_REPOSITORY);
  private _getAdminDashboardUseCase: GetAdminDashboardUseCase;

  constructor() {
    this._getAdminDashboardUseCase = new GetAdminDashboardUseCase(
      this._adminDashboardRepository,
    );
  }

  ngOnInit(): void {
    this._filterService.dateRange$.subscribe((value) => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      this._getAdminDashboardUseCase
        .execute({
          startDate: value.start ?? yesterday,
          endDate: value.end ?? today,
        })
        .subscribe((response) => {
          this.adminDashboard.set(response);
        });
    });
  }
}
