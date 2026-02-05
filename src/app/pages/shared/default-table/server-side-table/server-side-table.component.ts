import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  DefaultTableColumn,
  DefaultTableComponent,
  DisplayMode,
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

@Component({
  selector: 'app-server-side-table',
  templateUrl: './server-side-table.component.html',
  styleUrls: ['./server-side-table.component.scss'],
  imports: [
    DefaultTableComponent,
    NgStyle,
    DefaultTableMobileItemViewDirective,
    DefaultTableActionContainerDirective,
    NgTemplateOutlet,
    SkeletonComponent,
  ],
})
export class ServerSideTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() searchable: boolean = false;
  @Input() searchPlaceholder: string = '';
  @Input() trackBy: string = 'id';
  @Input() displayMode: DisplayMode = DisplayMode.Hybrid;

  @Output() rowClick = new EventEmitter<RowClickEvent>();

  isLoaded = false;
  dataSource: any[] = [];
  length: number = 0;
  columns: DefaultTableColumn[] = [];
  search: string = '';
  initialized = false;
  snackBarRef?: MatSnackBarRef<any>;

  @ViewChild(DefaultTableComponent, { static: true })
  table!: DefaultTableComponent;

  @ContentChild(DefaultTableMobileItemViewDirective)
  mobileItemView?: DefaultTableMobileItemViewDirective;

  @ContentChild(DefaultTableActionContainerDirective)
  actionContainer?: DefaultTableActionContainerDirective;

  columnsChangeSubscription!: Subscription;
  searchChangeSubscription!: Subscription;

  constructor(
    @Inject(TABLE_SERVICE) private service: ServerSideTableService<any, any>,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.columns = this.service.columns;
    this.columnsChangeSubscription = this.service.columnsChange.subscribe(
      (columns) => {
        this.columns = columns;
        this.table.renderRows();
      },
    );
    this.search = this.service.search;
    this.searchChangeSubscription = this.service.searchChange.subscribe(
      (search) => {
        this.search = search;
        this.refreshData();
      },
    );
    this.service.setTable(this.table);
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
          this.length = response.total;
          this.dataSource = response.data;
          this.table.renderRows();
          this.initialized = true;
          this.isLoaded = true;
          this.snackBarRef?.dismiss();
        },
        error: (response) => {
          this.snackBarRef?.dismiss();
        },
      });
  }

  refreshData(): void {
    this.showLoadingSnackBar();
    this.get();
  }

  showLoadingSnackBar(): void {
    this.snackBarRef = this.snackBar.open('Loading...', undefined, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
