import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface ConfirmDialogData {
  message: string;
  yes$: Observable<any>;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  isLoading: boolean = false;
  error: string = '';
  formGroup = new UntypedFormGroup({});

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  ngOnInit(): void {}

  onSubmitted(): void {
    this.isLoading = true;
    this.data.yes$.subscribe(
      (response) => {
        this.isLoading = false;
        this.dialogRef.close('success');
      },
      (error) => {
        this.isLoading = false;
        this.error = error;
      }
    );
  }
}
