import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { getCssVar } from 'src/app/pages/shared/utils/style.utils';

@Component({
  selector: 'app-user-trends',
  imports: [BaseChartDirective],
  templateUrl: './user-trends.component.html',
  styleUrl: './user-trends.component.scss',
})
export class UserTrendsComponent {
  primary = getCssVar('--mat-sys-primary');
  secondary = getCssVar('--mat-sys-secondary');

  @Input() data: ChartData<'line'> = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'New Users',
        fill: 'origin',
        borderColor: this.primary,
        backgroundColor: this.primary + '33',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Active Users',
        fill: 'origin',
        borderColor: this.secondary,
        backgroundColor: this.secondary + '33',
      },
    ],
    labels: [
      '2025-06-07',
      '2025-06-08',
      '2025-06-09',
      '2025-06-10',
      '2025-06-11',
      '2025-06-12',
      '2025-06-13',
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
