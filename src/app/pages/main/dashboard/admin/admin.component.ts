import { AsyncPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USER_REPOSITORY } from 'src/app/app-token-repository';
import { GetUseCaseResponse } from 'src/app/domain/base-use-cases/get-use-case';
import { User } from 'src/app/domain/entities/user';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import { GetUsersUseCase } from 'src/app/domain/use-cases/get-users-use-case';
import { SkeletonComponent } from 'src/app/pages/shared/skeleton/skeleton.component';

import { DefaultNumberPipe } from '../../../shared/text/default-number.pipe';
import { UserActivityInHourComponent } from 'src/app/pages/main/dashboard/admin/user-activity-in-hour/user-activity-in-hour.component';
import { ChartData } from 'chart.js';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-admin',
  imports: [
    MatCardModule,
    DefaultNumberPipe,
    AsyncPipe,
    SkeletonComponent,
    UserActivityInHourComponent,
    MatSlideToggle,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
})
export class AdminComponent implements OnInit {
  totalUser$: Observable<number>;

  userInTimeData?: ChartData<'bar'>;

  public hourlyBarChartData: ChartData<'bar'> = {
    labels: [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ],
    datasets: [
      {
        data: [
          65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80,
          81, 56, 55, 40, 56, 55, 65,
        ],
        label: 'New User',
      },
      {
        data: [
          23, 67, 89, 12, 45, 98, 56, 33, 71, 20, 90, 66, 5, 38, 72, 14, 59, 80,
          91, 3, 44, 77, 64, 26,
        ],
        label: 'Active User',
      },
    ],
  };

  public dailyBarChartData: ChartData<'bar'> = {
    labels: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    datasets: [
      {
        data: [431, 205, 379, 122, 498, 316, 243],
        label: 'New User',
      },
      {
        data: [324, 472, 198, 389, 441, 278, 356],
        label: 'Active User',
      },
    ],
  };

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
  }

  ngOnInit(): void {
    this.userInTimeData = Object.assign({}, this.hourlyBarChartData);
  }

  onDailyToggleChanged(value: MatSlideToggleChange): void {
    const newData = value.checked
      ? this.dailyBarChartData
      : this.hourlyBarChartData;
    this.userInTimeData = Object.assign({}, newData);
  }
}
