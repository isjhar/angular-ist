import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { SnackBarService } from 'src/app/pages/shared/snack-bar.service';

@Component({
  template: '',
})
export class BaseComponent implements OnInit, OnDestroy {
  protected breakpointObserver = inject(BreakpointObserver);

  snackBarService = inject(SnackBarService);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
