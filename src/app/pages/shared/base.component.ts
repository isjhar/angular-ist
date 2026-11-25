import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { SnackBarService } from 'src/app/pages/shared/snack-bar.service';

@Component({
  template: '',
})
export class BaseComponent implements OnInit, OnDestroy {
  protected readonly AccessControlId = AccessControlId;
  protected breakpointObserver = inject(BreakpointObserver);

  snackBarService = inject(SnackBarService);

  isHandset = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        map((result) => result.matches),
        shareReplay(),
      ),
    { initialValue: false },
  );

  hasHover = toSignal(
    this.breakpointObserver.observe('(hover: hover)').pipe(
      map((result) => result.matches),
      shareReplay(),
    ),
    { initialValue: true },
  );

  isNoPointer = computed(() => !this.hasHover());

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
