import {
  AfterViewInit,
  Component,
  contentChild,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
  TemplateRef,
  viewChild,
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
import { NgStyle, NgClass, NgTemplateOutlet } from '@angular/common';
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
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DefaultDatePipe } from 'src/app/pages/shared/text/default-date.pipe';
import { DefaultDateTimePipe } from 'src/app/pages/shared/text/default-date-time.pipe';
import { DefaultTimePipe } from 'src/app/pages/shared/text/default-time.pipe';
import { DefaultTableTopActionContainerDirective } from 'src/app/pages/shared/default-table/default-table-top-action-container.directive';
import { DefaultTableFilterContainerContainerDirective } from 'src/app/pages/shared/default-table/default-table-filter-container.directive';

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

export type DisplayType = 'table' | 'card' | 'hybrid';

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
    DefaultDatePipe,
    DefaultCurrencyPipe,
    DefaultNumberPipe,
    DefaultDateTimePipe,
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
    DefaultTimePipe,
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class DefaultTableComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  readonly length = input(0);
  readonly searchable = input(false);
  readonly searchPlaceholder = input('');
  readonly paginatable = input(true);
  readonly displayType = input<DisplayType>('hybrid');
  readonly trackBy = input('id');

  readonly columnsInput = input<DefaultTableColumn[]>([], { alias: 'columns' });
  readonly columns = computed(() => [
    { prop: 'position', show: true, title: 'No.', showHandset: true },
    ...this.columnsInput(),
  ]);

  readonly showSortBy = computed(() => this.columns().some((x) => x.sortBy));

  readonly dataSourceInput = input<any[]>([], { alias: 'dataSource' });
  readonly dataSource = computed(() => {
    const values = this.dataSourceInput();
    const pag = this.paginator();
    let startPosition = pag ? pag.pageIndex * pag.pageSize + 1 : 1;
    return values.map((x) => {
      const newSource = Object.assign({ position: startPosition }, x);
      startPosition++;
      return newSource;
    });
  });

  readonly sortActive = input<string>('');
  readonly sortDirection = input<SortDirection>('');

  readonly page = output<any>();
  readonly sortChange = output<any>();
  readonly rowClick = output<RowClickEvent>();
  readonly searchChange = output<string>();

  readonly table = viewChild(MatTable);
  readonly paginator = viewChild(MatPaginator);
  readonly sorter = viewChild(MatSort);

  readonly mobileItemView = contentChild(DefaultTableMobileItemViewDirective);
  readonly actionContainer = contentChild(DefaultTableActionContainerDirective);
  readonly topActionContainer = contentChild(
    DefaultTableTopActionContainerDirective,
  );
  readonly filterContainer = contentChild(
    DefaultTableFilterContainerContainerDirective,
  );

  readonly useMobileView = computed(
    () => this.isHandset() || this.isNoPointer(),
  );

  pageSizeOptions = [20, 50, 100];
  actionColumnName = '_actionColumn';

  readonly displayedColumns = computed(() => {
    const cols = this.columns()
      .filter((x) => x.show && (!this.useMobileView() || x.showHandset))
      .map((x) => x.prop);
    if (this.actionContainer()) {
      cols.push(this.actionColumnName);
    }
    return cols;
  });

  readonly pageSize = computed(() => this.paginator()?.pageSize ?? 20);

  get pageIndex() {
    return (this.paginator()?.pageIndex ?? 0) + 1;
  }

  sort = signal('');
  order = signal<SortDirection>('asc');

  private sortUrlSeeded = false;
  private sortUrlSeedSnapshot: {
    active: string;
    direction: SortDirection;
  } | null = null;

  pendingPageIndex: number | null = null;

  searchControl = new FormControl<string>('');

  get search() {
    return this.searchControl.value ?? '';
  }

  readonly isTableView = computed(() => {
    const dt = this.displayType();
    return (
      dt == 'table' ||
      (dt == 'hybrid' &&
        (!this.useMobileView() || this.mobileItemView() == undefined))
    );
  });

  readonly isRowClickHasListener = computed(() => false);

  readonly isCardView = computed(() => {
    const mv = this.mobileItemView();
    const dt = this.displayType();
    return (
      mv != undefined &&
      (dt == 'card' || (this.useMobileView() && dt == 'hybrid'))
    );
  });

  searchValueChangesSubscription!: Subscription;

  private paginatorIntl = inject(MatPaginatorIntl);

  constructor() {
    super();
    this.paginatorIntl.itemsPerPageLabel = $localize`:itemPerPage:Item per halaman`;
    this.paginatorIntl.nextPageLabel = $localize`:nextPage:Halaman berikutnya`;
    this.paginatorIntl.previousPageLabel = $localize`:previousPage:Halaman sebelumnya`;
    this.paginatorIntl.firstPageLabel = $localize`:firstPage:Halaman pertama`;
    this.paginatorIntl.lastPageLabel = $localize`:lastPage:Halaman terakhir`;
    this.paginatorIntl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number,
    ) => {
      if (length === 0 || pageSize === 0) {
        return $localize`:fromOfTo:0 dari ${length}`;
      }
      const startIndex = page * pageSize;
      const endIndex = Math.min(startIndex + pageSize, length);
      return $localize`:fromOfTo:${startIndex + 1} \u2013 ${endIndex} dari ${length}`;
    };

    effect(() => {
      if (this.sort() && this.order()) return;

      const active = this.sortActive();
      const direction = this.sortDirection();
      if (this.sortUrlSeeded) {
        const snapshot = this.sortUrlSeedSnapshot;
        this.sortUrlSeeded = false;
        this.sortUrlSeedSnapshot = null;
        if (
          snapshot &&
          snapshot.active === active &&
          snapshot.direction === direction
        ) {
          return;
        }
      }
      this.sort.set(active);
      this.order.set(direction);
    });
  }

  seedSort(sort: string, direction: SortDirection): void {
    this.sort.set(sort);
    this.order.set(direction);
    this.sortUrlSeeded = true;
    this.sortUrlSeedSnapshot = {
      active: this.sortActive(),
      direction: this.sortDirection(),
    };
  }

  ngAfterViewInit(): void {
    const pag = this.paginator();
    if (pag) {
      pag.pageSize = 20;
    }
    if (this.pendingPageIndex !== null) {
      if (pag) {
        pag.pageIndex = this.pendingPageIndex;
      }
      this.pendingPageIndex = null;
    }
  }

  override ngOnInit(): void {
    this.searchValueChangesSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        const pag = this.paginator();
        if (pag) {
          pag.pageIndex = 0;
        }
        this.searchChange.emit(value ?? '');
      });
  }

  override ngOnDestroy(): void {
    this.searchValueChangesSubscription.unsubscribe();
    super.ngOnDestroy();
  }

  onPageChanged(event: any): void {
    this.page.emit(event);
  }

  onSortChanged(event: any): void {
    const direction = event.direction ?? '';
    this.sort.set(direction ? event.active : '');
    this.order.set(direction);
    const s = this.sorter();
    if (s) {
      s.active = this.sort();
      s.direction = this.order();
    }
    this.sortChange.emit(event);
  }

  renderRows(): void {
    this.table()?.renderRows();
  }

  onRowClicked(event: Event, row: any): void {
    event.preventDefault();
    this.rowClick.emit({
      clickEvent: event,
      row: row,
    });
  }

  changeSort(value: any): void {
    this.sort.set(value);
    this.order.set(value ? this.order() || 'asc' : '');
    this.onSortChanged({
      active: this.sort(),
      direction: this.order(),
    });
  }

  toggleOrder(options?: { emitEvent: boolean }): void {
    this.order.set(this.order() === 'asc' ? 'desc' : 'asc');
    const emitEvent = options ? options.emitEvent : true;
    if (emitEvent) {
      this.onSortChanged({
        active: this.sort(),
        direction: this.order(),
      });
    }
  }
}
