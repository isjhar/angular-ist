import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private loadingSnackBarRef?: MatSnackBarRef<any>;

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.snackBar.open(message, $localize`:close:Close`, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, $localize`:close:Close`, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  showLoading(message: string): void {
    this.loadingSnackBarRef = this.snackBar.open(message, undefined, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  dismissLoading(): void {
    this.loadingSnackBarRef?.dismiss();
  }
}
