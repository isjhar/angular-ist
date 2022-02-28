import { Observable, Subject } from 'rxjs';
import { ApiResponse, Pagination, PaginationParams } from 'src/app/api';
import { DefaultTableColumn } from '../default-table.component';

export abstract class ServerSideTableService {
  columns: DefaultTableColumn[] = [];
  columnsChange = new Subject<DefaultTableColumn[]>();

  changeColumns(columns: DefaultTableColumn[]): void {
    this.columns = columns;
    this.columnsChange.next(columns);
  }
  abstract getList(
    params: PaginationParams
  ): Observable<ApiResponse<Pagination<any>>>;
  abstract map(source: any): any;
}
