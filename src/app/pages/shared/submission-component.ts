import { inject } from '@angular/core';
import { BaseComponent } from 'src/app/pages/shared/base.component';
import { SnackBarService } from 'src/app/pages/shared/snack-bar.service';

export class SubmissionComponent extends BaseComponent {
  isLoading: boolean = false;

  snackbar = inject(SnackBarService);

  constructor() {
    super();
  }

  onSucceeded(message: string): void {
    this.isLoading = false;
    this.snackbar.showSuccess(message);
  }

  onError(error: any): void {
    this.isLoading = false;
    this.snackbar.showError(`Process failed: ${error}`);
  }
}
