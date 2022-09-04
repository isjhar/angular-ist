import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MENU_REPOSITORY } from 'src/app/app.module';
import { MenuRepository } from 'src/app/domain/repositories/menu-repository';
import { StoreMenuUseCase } from 'src/app/domain/use-cases/store-menu-use-case';
import { UpdateMenuUseCase } from 'src/app/domain/use-cases/update-menu-use-case';

export interface AddDialogData {
  value: any;
}
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  menuOptions: any[] = [];
  isLoading: boolean = false;
  error: string = '';

  formGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
  });

  get id() {
    return this.formGroup.get('id') as FormControl;
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get url() {
    return this.formGroup.get('url') as FormControl;
  }
  storeMenuUseCase: StoreMenuUseCase;
  updateMenuUseCase: UpdateMenuUseCase;

  constructor(
    @Inject(MENU_REPOSITORY) menuRepository: MenuRepository,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData
  ) {
    this.storeMenuUseCase = new StoreMenuUseCase(menuRepository);
    this.updateMenuUseCase = new UpdateMenuUseCase(menuRepository);
  }

  ngOnInit(): void {
    this.formGroup.patchValue(this.data.value);
  }

  onSubmitted(): void {
    this.isLoading = true;
    let params = {
      name: this.name.value,
      url: this.url.value,
    };

    if (this.id.value == 0) {
      this.storeMenuUseCase.execute(params).subscribe(
        (response) => {
          this.isLoading = false;
          this.dialogRef.close('success');
        },
        (error) => {
          this.isLoading = false;
          this.error = error;
        }
      );
      return;
    }

    this.updateMenuUseCase
      .execute(Object.assign({}, { id: this.id.value }, params))
      .subscribe(
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
