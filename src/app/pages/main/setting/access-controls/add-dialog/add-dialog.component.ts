import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ACCESS_CONTROL_REPOSITORY } from 'src/app/app-token-repository.module';
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

  formGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl('', Validators.required),
  });
  get name() {
    return this.formGroup.get('name') as UntypedFormControl;
  }

  get description() {
    return this.formGroup.get('description') as UntypedFormControl;
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
