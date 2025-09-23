import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader, SortDirection } from '@angular/material/sort';
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
  MatTableModule,
} from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DefaultTableMobileItemViewDirective } from './default-table-mobile-item-view.directive';
import { BaseComponent } from '../base.component';
import { NgStyle, NgClass, NgTemplateOutlet, DatePipe } from '@angular/common';
import { DefaultCurrencyPipe } from '../text/default-currency.pipe';
import { DefaultNumberPipe } from '../text/default-number.pipe';
import { DefaultTableActionContainerDirective } from 'src/app/pages/shared/default-table/default-table-action-container.directive';
import { RowClickEvent } from 'src/app/pages/shared/default-table/row-click-event';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface DefaultTableColumn {
  title: string;
  prop: string;
  show: boolean;
  cellTemplate?: TemplateRef<any>;
  cellTemplateByType?: string;
  sortBy?: string;
  showHandset?: boolean;
}

export enum DisplayMode {
  Table,
  Card,
  Hybrid,
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
    MatNoDataRow,
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
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatInput,
    ReactiveFormsModule,
    MatTableModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultTableComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, AfterContentInit, OnDestroy
{
  @Input() length: number = 0;
  @Input() searchable: boolean = false;
  @Input() searchPlaceholder: string = '';
  @Input() displayMode: DisplayMode = DisplayMode.Hybrid;

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
  @Output() searchChange = new EventEmitter<string>();

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

  sort: string = '';
  order: SortDirection = 'asc';

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  get searchControl() {
    return this.searchForm.get('search') as FormControl;
  }

  get search() {
    return this.searchControl.value;
  }

  get isTableView(): boolean {
    return (
      this.displayMode == DisplayMode.Table ||
      (this.displayMode == DisplayMode.Hybrid &&
        (!this.isHandset || this.mobileItemView == undefined))
    );
  }

  get isRowClickHasListener(): boolean {
    return this.rowClick.observed;
  }

  get isCardView(): boolean {
    return (
      this.mobileItemView != undefined &&
      (this.displayMode == DisplayMode.Card ||
        (this.isHandset && this.displayMode == DisplayMode.Hybrid))
    );
  }

  isHandset: boolean = false;
  searchValueChangesSubscription!: Subscription;

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

    this.searchValueChangesSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.paginator.pageIndex = 0;
        this.searchChange.emit(value);
      });
  }

  override ngOnDestroy(): void {
    this.searchValueChangesSubscription.unsubscribe();
    super.ngOnDestroy();
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
    this.sort = event.active;
    this.order = event.direction;
    this.sorter.active = this.sort;
    this.sorter.direction = this.order;
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

  changeSort(value: any): void {
    this.sort = value;
    this.onSortChanged({
      active: this.sort,
      direction: this.order,
    });
  }

  toggleOrder(): void {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.onSortChanged({
      active: this.sort,
      direction: this.order,
    });
  }
}
