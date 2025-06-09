import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ACCESS_CONTROL_REPOSITORY } from 'src/app/app-token-repository.module';
import { AccessControlRepository } from 'src/app/domain/repositories/access-control-repository';
import { StoreAccessControlUseCase } from 'src/app/domain/use-cases/store-access-control-use-case';
import { FormErrorRequiredComponent } from 'src/app/pages/shared/default-form/form-error/form-error-required/form-error-required.component';
import { LoadingButtonComponent } from 'src/app/pages/shared/default-form/loading-button/loading-button.component';

export interface AddDialogData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-add-dialog',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    FormErrorRequiredComponent,
    LoadingButtonComponent,
  ],
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  standalone: true,
})
export class AddDialogComponent implements OnInit {
  isLoading: boolean = false;
  error: string = '';

  formGroup = new UntypedFormGroup({
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
