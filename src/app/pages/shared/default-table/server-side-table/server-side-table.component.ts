import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @Input() searchable: boolean = false;

  dataSource: any[] = [];
  length: number = 0;
  columns: DefaultTableColumn[] = [];
  search: string = '';

  @ViewChild(DefaultTableComponent, { static: true })
  table!: DefaultTableComponent;

  columnsChangeSubscription!: Subscription;
  searchChangeSubscription!: Subscription;

  constructor(private service: ServerSideTableService) {}

  ngOnInit(): void {
    this.columns = this.service.columns;
    this.columnsChangeSubscription = this.service.columnsChange.subscribe(
      (columns) => {
        this.columns = columns;
        this.table.renderRows();
      }
    );
    this.search = this.service.search;
    this.searchChangeSubscription = this.service.searchChange.subscribe(
      (search) => {
        this.search = search;
        this.refreshData();
      }
    );
  }

  ngOnDestroy(): void {
    this.columnsChangeSubscription.unsubscribe();
    this.searchChangeSubscription.unsubscribe();
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
        search: this.search,
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
