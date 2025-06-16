import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserActivity } from 'src/app/domain/entities/admin-dashboard';
import { getCssVar } from 'src/app/pages/shared/utils/style.utils';

@Component({
  selector: 'app-user-activity-in-hour',
  imports: [BaseChartDirective],
  templateUrl: './user-activity-in-hour.component.html',
  styleUrl: './user-activity-in-hour.component.scss',
})
export class UserActivityInHourComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() set showDaily(value: boolean) {
    if (value) {
      this.data = Object.assign({}, this.dailyBarChartData);
    } else {
      this.data = Object.assign({}, this.hourlyBarChartData);
    }
  }

  @Input() set hourlyUserActivities(value: UserActivity) {
    this.hourlyBarChartData.datasets[0].data = value.newActivties;
    this.hourlyBarChartData.datasets[1].data = value.activeActivities;
    this.chart?.update();
  }

  @Input() set dailyUserActivities(value: UserActivity) {
    this.dailyBarChartData.datasets[0].data = value.newActivties;
    this.dailyBarChartData.datasets[1].data = value.activeActivities;
    this.chart?.update();
  }

  primary = getCssVar('--mat-sys-primary');
  secondary = getCssVar('--mat-sys-secondary-fixed-dim');

  data: ChartData<'bar', any> = {
    datasets: [],
  };

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
        data: [],
        label: 'New Users',
        backgroundColor: this.primary,
      },
      {
        data: [],
        label: 'Active Users',
        backgroundColor: this.secondary,
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
        label: 'New Users',
        backgroundColor: this.primary,
      },
      {
        data: [324, 472, 198, 389, 441, 278, 356],
        label: 'Active Users',
        backgroundColor: this.secondary,
      },
    ],
  };

  public options: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  public barChartType = 'bar' as const;
}
