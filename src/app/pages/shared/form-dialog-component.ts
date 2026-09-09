import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SubmissionComponent } from 'src/app/pages/shared/submission-component';

@Component({
  template: '',
})
export class FormDialogComponent extends SubmissionComponent {
  constructor(protected dialogRef: MatDialogRef<any>) {
    super();
  }

  override onSucceeded(): void {
    this.isLoading = false;
    this.dialogRef.close('success');
  }
}
