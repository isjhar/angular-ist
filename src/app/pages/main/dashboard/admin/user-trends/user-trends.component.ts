import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { getCssVar } from 'src/app/pages/shared/utils/style.utils';
import 'chartjs-adapter-moment';
import { UserTrend } from 'src/app/domain/entities/admin-dashboard';
import moment from 'moment';

@Component({
  selector: 'app-user-trends',
  imports: [BaseChartDirective],
  templateUrl: './user-trends.component.html',
  styleUrl: './user-trends.component.scss',
})
export class UserTrendsComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() set activeUserTrends(value: UserTrend[]) {
    this.data.datasets[1].data = value.map((userTrend) => {
      return {
        x: moment(userTrend.date).format('YYYY-MM-DD'),
        y: userTrend.total,
      };
    });
    this.chart?.update();
  }
  @Input() set newUserTrends(value: UserTrend[]) {
    this.data.datasets[0].data = value.map((userTrend) => {
      return {
        x: moment(userTrend.date).format('YYYY-MM-DD'),
        y: userTrend.total,
      };
    });
    this.chart?.update();
  }

  primary = getCssVar('--mat-sys-primary');
  secondary = getCssVar('--mat-sys-secondary-fixed-dim');
  data: ChartData<'line', { x: string | Date; y: number }[]> = {
    datasets: [
      {
        data: [
          // { x: '2025-06-07', y: 65 },
          // { x: '2025-06-08', y: 59 },
          // { x: '2025-06-09', y: 80 },
          // { x: '2025-06-10', y: 81 },
          // { x: '2025-06-11', y: 56 },
          // { x: '2025-06-12', y: 55 },
          // { x: '2025-06-13', y: 40 },
        ],
        label: 'New Users',
        fill: 'origin',
        borderColor: this.primary,
        backgroundColor: this.primary + '33',
      },
      {
        data: [
          // { x: '2025-06-07', y: 28 },
          // { x: '2025-06-08', y: 48 },
          // { x: '2025-06-09', y: 40 },
          // { x: '2025-06-10', y: 19 },
          // { x: '2025-06-11', y: 86 },
          // { x: '2025-06-12', y: 27 },
          // { x: '2025-06-13', y: 90 },
        ],
        label: 'Active Users',
        fill: 'origin',
        borderColor: this.secondary,
        backgroundColor: this.secondary + '33',
      },
    ],
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.1,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'YYYY-MM-DD',
          unit: 'day',
          tooltipFormat: 'MMM DD, YYYY',
        },
        title: {
          display: true,
        },
      },
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  public chartType: ChartType = 'line';
}
