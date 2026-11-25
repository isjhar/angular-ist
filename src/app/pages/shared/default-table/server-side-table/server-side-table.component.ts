import {
  AfterViewInit,
  Component,
  contentChild,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  DefaultTableColumn,
  DefaultTableComponent,
  DisplayMode,
  DisplayType,
} from '../default-table.component';
import {
  ServerSideTableService,
  TABLE_SERVICE,
} from './server-side-table.service';
import { DefaultTableMobileItemViewDirective } from '../default-table-mobile-item-view.directive';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { SkeletonComponent } from '../../skeleton/skeleton.component';
import { DefaultTableActionContainerDirective } from 'src/app/pages/shared/default-table/default-table-action-container.directive';
import { RowClickEvent } from 'src/app/pages/shared/default-table/row-click-event';
import { SortDirection } from '@angular/material/sort';
import { DefaultTableTopActionContainerDirective } from 'src/app/pages/shared/default-table/default-table-top-action-container.directive';
import { DefaultTableFilterContainerContainerDirective } from 'src/app/pages/shared/default-table/default-table-filter-container.directive';

@Component({
  selector: 'app-server-side-table',
  templateUrl: './server-side-table.component.html',
  styleUrls: ['./server-side-table.component.scss'],
  imports: [
    DefaultTableComponent,
    NgStyle,
    DefaultTableMobileItemViewDirective,
    DefaultTableActionContainerDirective,
    DefaultTableTopActionContainerDirective,
    NgTemplateOutlet,
    SkeletonComponent,
    DefaultTableFilterContainerContainerDirective,
  ],
})
export class ServerSideTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  readonly searchable = input(false);
  readonly searchPlaceholder = input('');
  readonly trackBy = input('id');

  readonly displayMode = input<DisplayMode | undefined>(undefined);
  displayType = signal<DisplayType>('hybrid');

  readonly sortActive = input<string>('');
  readonly sortDirection = input<SortDirection>('');

  readonly rowClick = output<RowClickEvent>();

  isLoaded = signal(false);
  dataSource = signal<any[]>([]);
  length = signal(0);
  columns = signal<DefaultTableColumn[]>([]);
  search = signal('');
  initialized = signal(false);
  snackBarRef?: MatSnackBarRef<any>;

  readonly table = viewChild(DefaultTableComponent);

  readonly mobileItemView = contentChild(DefaultTableMobileItemViewDirective);
  readonly actionContainer = contentChild(DefaultTableActionContainerDirective);
  readonly topActionContainer = contentChild(
    DefaultTableTopActionContainerDirective,
  );
  readonly filterContainer = contentChild(
    DefaultTableFilterContainerContainerDirective,
  );

  columnsChangeSubscription!: Subscription;
  searchChangeSubscription!: Subscription;

  private service = inject<ServerSideTableService<any, any>>(TABLE_SERVICE);
  private snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      const mode = this.displayMode();
      if (mode !== undefined) {
        switch (mode) {
          case DisplayMode.Card:
            this.displayType.set('card');
            break;
          case DisplayMode.Hybrid:
            this.displayType.set('hybrid');
            break;
          default:
            this.displayType.set('table');
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    this.columns.set(this.service.columns);
    this.columnsChangeSubscription = this.service.columnsChange.subscribe(
      (columns) => {
        this.columns.set(columns);
        this.table()?.renderRows();
      },
    );
    this.search.set(this.service.search);
    this.searchChangeSubscription = this.service.searchChange.subscribe(
      (search) => {
        this.search.set(search);
        this.refreshData();
      },
    );
    this.service.setTable(this.table()!);
  }

  ngAfterViewInit(): void {
    this.get();
  }

  ngOnDestroy(): void {
    this.columnsChangeSubscription.unsubscribe();
    this.searchChangeSubscription.unsubscribe();
  }

  onPageChanged(event: any): void {
    this.showLoadingSnackBar();
    this.get();
  }

  onSortChanged(event: any): void {
    this.showLoadingSnackBar();
    this.get();
  }

  onSearchChanged(search: string): void {
    this.showLoadingSnackBar();
    this.get();
  }

  onRowClicked(event: RowClickEvent): void {
    this.rowClick.emit(event);
  }

  get(): void {
    this.service
      .get(this.service.getParams())
      .pipe(delay(0))
      .subscribe({
        next: (response) => {
          this.length.set(response.total);
          this.dataSource.set(response.data);
          this.table()?.renderRows();
          this.initialized.set(true);
          this.isLoaded.set(true);
          this.snackBarRef?.dismiss();
        },
        error: (response) => {
          this.snackBarRef?.dismiss();
        },
      });
  }

  resetData(): void {
    if (!this.initialized()) return;
    this.table()!.paginator()!.pageIndex = 0;
    this.showLoadingSnackBar();
    this.get();
  }

  refreshData(): void {
    if (!this.initialized()) return;
    this.showLoadingSnackBar();
    this.get();
  }

  showLoadingSnackBar(): void {
    this.snackBarRef = this.snackBar.open('Loading...', undefined, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  updateRow(oldItem: any, newItem: any): void {
    this.dataSource.update((values) => {
      const index = values.findIndex(
        (element) => element[this.trackBy()] == oldItem[this.trackBy()],
      );
      const updated = [...values];
      updated[index] = Object.assign({}, updated[index], newItem);
      return updated;
    });
  }
}
