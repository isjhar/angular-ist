import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-user-activity-in-hour',
  imports: [BaseChartDirective],
  templateUrl: './user-activity-in-hour.component.html',
  styleUrl: './user-activity-in-hour.component.scss',
})
export class UserActivityInHourComponent {
  @Input() data: ChartData<'bar'> = {
    datasets: [],
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
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

enum UserActivityPeriod {
  daily,
  hourly,
}
