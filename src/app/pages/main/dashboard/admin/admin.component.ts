import { AsyncPipe } from '@angular/common';
import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ADMIN_DASHBOARD_REPOSITORY,
  USER_REPOSITORY,
} from 'src/app/app-token-repository';
import { GetUseCaseResponse } from 'src/app/domain/base-use-cases/get-use-case';
import { User } from 'src/app/domain/entities/user';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import { GetUsersUseCase } from 'src/app/domain/use-cases/get-users-use-case';
import { SkeletonComponent } from 'src/app/pages/shared/skeleton/skeleton.component';

import { DefaultNumberPipe } from '../../../shared/text/default-number.pipe';
import { UserActivityInHourComponent } from 'src/app/pages/main/dashboard/admin/user-activity-in-hour/user-activity-in-hour.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { UserTrendsComponent } from 'src/app/pages/main/dashboard/admin/user-trends/user-trends.component';
import 'chartjs-adapter-moment';
import { UserRolesComponent } from 'src/app/pages/main/dashboard/admin/user-roles/user-roles.component';
import { AdminDashboardRepository } from 'src/app/domain/repositories/admin-dashboard-repository';
import { ChartData } from 'chart.js';
import { GetAdminDashboardUseCase } from 'src/app/domain/use-cases/get-admin-dashboard-use-case';
import { FilterService } from 'src/app/pages/main/dashboard/filter.service';
import { UserTrend } from 'src/app/domain/entities/admin-dashboard';

@Component({
  selector: 'app-admin',
  imports: [
    MatCardModule,
    DefaultNumberPipe,
    AsyncPipe,
    SkeletonComponent,
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
  totalUser$: Observable<number>;
  activeUserTrends = signal<UserTrend[]>([]);
  newUserTrends = signal<UserTrend[]>([]);

  private _filterService = inject(FilterService);
  private _adminDashboardRepository = inject(ADMIN_DASHBOARD_REPOSITORY);
  private _getAdminDashboardUseCase: GetAdminDashboardUseCase;

  constructor(
    @Inject(USER_REPOSITORY)
    userRepository: UserRepository,
  ) {
    this.totalUser$ = new GetUsersUseCase(userRepository)
      .execute({ limit: 1 })
      .pipe(
        map<GetUseCaseResponse<User>, number>(
          (response) => response.pagination.total,
        ),
      );

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
          startDate: value.start?.toDate() ?? yesterday,
          endDate: value.end?.toDate() ?? today,
        })
        .subscribe((response) => {
          this.activeUserTrends.set(response.activeUserTrends);
          this.newUserTrends.set(response.newUserTrends);
        });
    });
  }
}
