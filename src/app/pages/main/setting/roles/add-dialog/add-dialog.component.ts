import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ROLE_REPOSITORY } from 'src/app/mock-repository.module';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { StoreRoleUseCase } from 'src/app/domain/use-cases/store-role-use-case';
import { UpdateRoleUseCase } from 'src/app/domain/use-cases/update-role-use-case';

export interface AddDialogData {
  value: any;
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
