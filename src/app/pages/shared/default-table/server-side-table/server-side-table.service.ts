import { InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  DefaultTableColumn,
  DefaultTableComponent,
} from '../default-table.component';

export const TABLE_SERVICE = new InjectionToken<
  ServerSideTableService<any, any>
>('this token for server side table service');

export abstract class ServerSideTableService<Params, Row> {
  search: string = '';
  columns: DefaultTableColumn[] = [];
  columnsChange = new Subject<DefaultTableColumn[]>();
  searchChange = new Subject<string>();
  table!: DefaultTableComponent;

  setTable(table: DefaultTableComponent) {
    this.table = table;
  }

  changeColumns(columns: DefaultTableColumn[]): void {
    this.columns = columns;
    this.columnsChange.next(columns);
  }
  changeSearch(search: string): void {
    this.search = search;
    this.searchChange.next(search);
  }
  abstract getParams(): Params;
  abstract get(params: Params): Observable<GetServerSideTablePagination<Row>>;
}

export interface GetServerSideTableParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
}

export interface GetServerSideTablePagination<T> {
  total: number;
  data: T[];
}
