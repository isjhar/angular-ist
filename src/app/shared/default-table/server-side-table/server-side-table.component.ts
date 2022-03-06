import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  DefaultTableColumn,
  DefaultTableComponent,
} from '../default-table.component';
import { ServerSideTableService } from './server-side-table.service';

@Component({
  selector: 'app-server-side-table',
  templateUrl: './server-side-table.component.html',
  styleUrls: ['./server-side-table.component.scss'],
})
export class ServerSideTableComponent implements OnInit, OnDestroy {
  dataSource: any[] = [];
  length: number = 0;
  columns: DefaultTableColumn[] = [];

  @ViewChild(DefaultTableComponent, { static: true })
  table!: DefaultTableComponent;

  columnsChangeSubscription!: Subscription;

  constructor(private service: ServerSideTableService) {}

  ngOnInit(): void {
    this.columns = this.service.columns;
    this.columnsChangeSubscription = this.service.columnsChange.subscribe(
      (columns) => {
        this.columns = columns;
        this.table.renderRows();
      }
    );
  }

  ngOnDestroy(): void {
    this.columnsChangeSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.getList();
  }

  onPageChanged(event: any): void {
    this.getList();
  }

  onSortChanged(event: any): void {
    this.getList();
  }

  getList(): void {
    this.service
      .getList({
        limit: this.table.pageSize,
        page: this.table.pageIndex + 1,
        sort: this.table.sort,
        order: this.table.order,
      })
      .subscribe((response: any) => {
        let pagination = response.data;
        this.length = pagination.total;
        this.dataSource = pagination.data.map((x: any) => this.service.map(x));
        this.table.renderRows();
      });
  }

  refreshData(): void {
    this.getList();
  }
}
