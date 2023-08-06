import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatLegacyDialogRef as MatDialogRef,
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from '@angular/material/legacy-dialog';
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
  formGroup = new FormGroup({});

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
