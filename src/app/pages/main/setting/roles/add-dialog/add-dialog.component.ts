import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ROLE_REPOSITORY } from 'src/app/app-token-repository.module';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { StoreRoleUseCase } from 'src/app/domain/use-cases/store-role-use-case';
import { UpdateRoleUseCase } from 'src/app/domain/use-cases/update-role-use-case';

import { FormErrorRequiredComponent } from '../../../../shared/default-form/form-error/form-error-required/form-error-required.component';
import { LoadingButtonComponent } from '../../../../shared/default-form/loading-button/loading-button.component';
import { MatButtonModule } from '@angular/material/button';

export interface AddDialogData {
  value: any;
}

@Component({
  selector: 'app-add-dialog',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
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
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
  });

  get id() {
    return this.formGroup.get('id') as FormControl;
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  storeRoleUseCase: StoreRoleUseCase;
  updateRoleUseCase: UpdateRoleUseCase;

  constructor(
    @Inject(ROLE_REPOSITORY) roleRepository: RoleRepository,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData
  ) {
    this.storeRoleUseCase = new StoreRoleUseCase(roleRepository);
    this.updateRoleUseCase = new UpdateRoleUseCase(roleRepository);
  }

  ngOnInit(): void {}

  onSubmitted(): void {
    this.isLoading = true;
    let params = {
      name: this.name.value,
    };
    this.storeRoleUseCase.execute(params).subscribe(
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
