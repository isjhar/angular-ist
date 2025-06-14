import { Component } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { getCssVar } from 'src/app/pages/shared/utils/style.utils';

@Component({
  selector: 'app-user-roles',
  imports: [BaseChartDirective],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.scss',
})
export class UserRolesComponent {
  primary = getCssVar('--neutral-variant-1');
  secondary = getCssVar('--neutral-variant-2');

  // Pie
  public options: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public data: ChartData<'pie', number[], string | string[]> = {
    labels: ['Sys Admin', 'Admin'],
    datasets: [
      {
        data: [1, 2],
        backgroundColor: [this.primary, this.secondary],
      },
    ],
  };
  public type: ChartType = 'pie';
}
