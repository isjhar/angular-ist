import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/pages/shared/base.component';

@Component({
  template: '',
})
export class FormDialogComponent extends BaseComponent {
  isLoading: boolean = false;

  constructor(protected dialogRef: MatDialogRef<any>) {
    super();
  }

  onSucceeded(): void {
    this.isLoading = false;
    this.dialogRef.close('success');
  }

  onError(response: any): void {
    this.isLoading = false;
    this.snackBarService.showError(`Process failed: ${response}`);
  }
}
