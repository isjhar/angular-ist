import { Observable, Subject } from 'rxjs';
import { Pagination } from 'src/app/domain/entities/pagination';
import { PaginationParams } from 'src/app/domain/entities/pagination-params';
import { DefaultTableColumn } from '../default-table.component';

export abstract class ServerSideTableService {
  search: string = '';
  columns: DefaultTableColumn[] = [];
  columnsChange = new Subject<DefaultTableColumn[]>();
  searchChange = new Subject<string>();

  changeColumns(columns: DefaultTableColumn[]): void {
    this.columns = columns;
    this.columnsChange.next(columns);
  }
  changeSearch(search: string): void {
    this.search = search;
    this.searchChange.next(search);
  }
  abstract getList(params: PaginationParams): Observable<Pagination<any>>;
  abstract map(source: any): any;
}
