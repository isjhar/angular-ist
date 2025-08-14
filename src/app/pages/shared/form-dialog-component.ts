import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map, Observable, shareReplay } from 'rxjs';
import { BaseComponent } from 'src/app/pages/shared/base.component';
import { SnackBarService } from 'src/app/pages/shared/snack-bar.service';

@Component({
  template: '',
})
export class FormDialogComponent extends BaseComponent {
  isLoading: boolean = false;

  snackBar = inject(SnackBarService);

  constructor(protected dialogRef: MatDialogRef<any>) {
    super();
  }

  onSucceeded(): void {
    this.isLoading = false;
    this.dialogRef.close('success');
  }

  onError(response: any): void {
    this.isLoading = false;
    this.snackBar.showError(`Process failed: ${response.error.message}`);
  }
}
