import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

export interface DefaultTableColumn {
  title: string;
  prop: string;
  show: boolean;
  cellTemplate?: TemplateRef<any>;
  sortBy?: string;
}

@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.scss'],
})
export class DefaultTableComponent implements OnInit {
  @Input() length: number = 0;

  private _columns: DefaultTableColumn[] = [];
  @Input() set columns(values: DefaultTableColumn[]) {
    this._columns = [
      {
        prop: 'position',
        show: true,
        title: 'No.',
      },
    ];
    this._columns.push(...values);
    this.displayedColumns = this._columns
      .filter((x) => x.show)
      .map((x) => x.prop);
  }
  get columns() {
    return this._columns;
  }

  private _dataSource: any[] = [];
  @Input() set dataSource(values: any[]) {
    let startPosition = this.pageIndex * this.pageSize + 1;
    this._dataSource = values.map((x) => {
      let newSource = Object.assign({ position: startPosition }, x);
      startPosition++;
      return newSource;
    });
  }
  get dataSource() {
    return this._dataSource;
  }

  @Output() page = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sorter!: MatSort;

  pageSizeOptions: number[] = [5, 10, 20];
  displayedColumns: string[] = [];

  get pageSize() {
    return this.paginator.pageSize;
  }

  get pageIndex() {
    return this.paginator.pageIndex;
  }

  get sort() {
    return this.sorter.active;
  }

  get order() {
    return this.sorter.direction;
  }

  constructor() {}

  ngOnInit(): void {}

  onPageChanged(event: any): void {
    this.page.emit(event);
  }

  onSortChanged(event: any): void {
    this.sortChange.emit(event);
  }

  renderRows(): void {
    this.table.renderRows();
  }
}
