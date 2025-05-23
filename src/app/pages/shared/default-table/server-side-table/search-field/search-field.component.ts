import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  ServerSideTableService,
  TABLE_SERVICE,
} from '../server-side-table.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  @Input() placeholder = '';
  formGroup = new FormGroup({
    search: new FormControl(''),
  });

  searchValueChangesSubscription!: Subscription;

  get search() {
    return this.formGroup.get('search') as FormControl;
  }

  constructor(
    @Inject(TABLE_SERVICE)
    private serverSideTableService: ServerSideTableService<any, any>
  ) {}

  ngOnInit(): void {
    this.searchValueChangesSubscription = this.search.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.serverSideTableService.changeSearch(value);
      });
  }

  ngOnDestroy(): void {
    this.searchValueChangesSubscription.unsubscribe();
  }
}
