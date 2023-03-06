import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ACCESS_CONTROL_REPOSITORY } from 'src/app/mock-repository.module';
import { AccessControlRepository } from 'src/app/domain/repositories/access-control-repository';
import { StoreAccessControlUseCase } from 'src/app/domain/use-cases/store-access-control-use-case';

export interface AddDialogData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  isLoading: boolean = false;
  error: string = '';

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get description() {
    return this.formGroup.get('description') as FormControl;
  }
  storeAccessControlUseCase: StoreAccessControlUseCase;

  constructor(
    @Inject(ACCESS_CONTROL_REPOSITORY)
    accessControlRepository: AccessControlRepository,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData
  ) {
    this.storeAccessControlUseCase = new StoreAccessControlUseCase(
      accessControlRepository
    );
  }

  ngOnInit(): void {
    this.formGroup.patchValue(this.data);
  }

  onSubmitted(): void {
    this.isLoading = true;
    let params = {
      name: this.name.value,
      description: this.description.value,
    };

    this.storeAccessControlUseCase.execute(params).subscribe(
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
