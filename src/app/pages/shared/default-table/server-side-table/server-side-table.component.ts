import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  DefaultTableColumn,
  DefaultTableComponent,
} from '../default-table.component';
import {
  ServerSideTableService,
  TABLE_SERVICE,
} from './server-side-table.service';

@Component({
  selector: 'app-server-side-table',
  templateUrl: './server-side-table.component.html',
  styleUrls: ['./server-side-table.component.scss'],
})
export class ServerSideTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() searchable: boolean = false;
  @Input() searchPlaceholder: string = '';

  dataSource: any[] = [];
  length: number = 0;
  columns: DefaultTableColumn[] = [];
  search: string = '';
  initialized = false;

  @ViewChild(DefaultTableComponent, { static: true })
  table!: DefaultTableComponent;

  columnsChangeSubscription!: Subscription;
  searchChangeSubscription!: Subscription;

  constructor(
    @Inject(TABLE_SERVICE) private service: ServerSideTableService<any, any>
  ) {}

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
    this.get();
  }

  onSortChanged(event: any): void {
    this.get();
  }

  get(): void {
    this.service
      .get(this.service.getParams())
      .pipe(delay(0))
      .subscribe((response) => {
        this.length = response.total;
        this.dataSource = response.data;
        this.table.renderRows();
        this.initialized = true;
      });
  }

  refreshData(): void {
    this.get();
  }
}
