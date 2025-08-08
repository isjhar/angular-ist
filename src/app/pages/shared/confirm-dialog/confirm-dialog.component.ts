import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { LoadingButtonComponent } from '../default-form/loading-button/loading-button.component';

export interface ConfirmDialogData {
  title: string;
  message: string;
  yes$: Observable<any>;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    LoadingButtonComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
})
export class ConfirmDialogComponent implements OnInit {
  isLoading: boolean = false;
  error: string = '';
  formGroup = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
  ) {}

  ngOnInit(): void {}

  onSubmitted(): void {
    this.isLoading = true;
    this.data.yes$.subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dialogRef.close('success');
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error;
      },
    });
  }
}
