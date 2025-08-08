import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatNoDataRow,
} from '@angular/material/table';
import { map, shareReplay } from 'rxjs/operators';
import { DefaultTableMobileItemViewDirective } from './default-table-mobile-item-view.directive';
import { BaseComponent } from '../base.component';
import { NgStyle, NgClass, NgTemplateOutlet, DatePipe } from '@angular/common';
import { DefaultCurrencyPipe } from '../text/default-currency.pipe';
import { DefaultNumberPipe } from '../text/default-number.pipe';
import { DefaultTableActionContainerDirective } from 'src/app/pages/shared/default-table/default-table-action-container.directive';
import { RowClickEvent } from 'src/app/pages/shared/default-table/row-click-event';

export interface DefaultTableColumn {
  title: string;
  prop: string;
  show: boolean;
  cellTemplate?: TemplateRef<any>;
  cellTemplateByType?: string;
  sortBy?: string;
  showHandset?: boolean;
}

@Component({
  selector: 'app-default-table',
  templateUrl: './default-table.component.html',
  styleUrls: ['./default-table.component.scss'],
  imports: [
    NgStyle,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    NgClass,
    MatSortHeader,
    MatCellDef,
    MatCell,
    NgTemplateOutlet,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatNoDataRow,
    MatPaginator,
    DatePipe,
    DefaultCurrencyPipe,
    DefaultNumberPipe,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultTableComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  @Input() length: number = 0;

  private _columns: DefaultTableColumn[] = [];
  @Input() set columns(values: DefaultTableColumn[]) {
    this._columns = [
      {
        prop: 'position',
        show: true,
        title: 'No.',
        showHandset: true,
      },
    ];
    this._columns.push(...values);
    this.adjustDisplayedColumns();
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

  @Input() trackBy: string = 'id';

  @Output() page = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<RowClickEvent>();

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sorter!: MatSort;

  @ContentChild(DefaultTableMobileItemViewDirective)
  mobileItemView?: DefaultTableMobileItemViewDirective;

  @ContentChild(DefaultTableActionContainerDirective)
  actionContainer?: DefaultTableActionContainerDirective;

  pageSizeOptions: number[] = [5, 10, 20];
  displayedColumns: string[] = [];

  actionColumnName = '_actionColumn';

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

  get isTableView(): boolean {
    return !this.isHandset || this.mobileItemView == undefined;
  }

  get isRowClickHasListener(): boolean {
    return this.rowClick.observed;
  }

  isHandset: boolean = false;

  constructor() {
    super();
  }

  ngAfterContentInit(): void {
    if (this.actionContainer) {
      this.displayedColumns.push(this.actionColumnName);

      this.displayedColumns = [...this.displayedColumns];
    }
  }
  ngAfterViewInit(): void {
    this.paginator.pageSize = 10;
  }

  override ngOnInit(): void {
    this.isHandset$.subscribe((isHandset) => {
      this.isHandset = isHandset;
      this.adjustDisplayedColumns();
    });
  }

  adjustDisplayedColumns(): void {
    const columns = this._columns
      .filter((x) => x.show && (!this.isHandset || x.showHandset))
      .map((x) => x.prop);
    if (this.actionContainer) {
      columns.push(this.actionColumnName);
    }

    this.displayedColumns = columns;
  }

  onPageChanged(event: any): void {
    this.page.emit(event);
  }

  onSortChanged(event: any): void {
    this.sortChange.emit(event);
  }

  renderRows(): void {
    this.table.renderRows();
  }

  onRowClicked(event: Event, row: any): void {
    event.preventDefault();
    this.rowClick.emit({
      clickEvent: event,
      row: row,
    });
  }
}
