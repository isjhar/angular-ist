import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreMenuUseCaseService } from 'src/app/domain/usecases/store-menu-use-case.service';
import { UpdateMenuUseCaseService } from 'src/app/domain/usecases/update-menu-use-case.service';

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

  constructor(
    private storeMenuUseCaseService: StoreMenuUseCaseService,
    private updateMenuUseCaseService: UpdateMenuUseCaseService,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData
  ) {}

  ngOnInit(): void {
    this.formGroup.patchValue(this.data.value);
  }

  onSubmitted(): void {
    this.isLoading = true;
    let params = {
      name: this.name.value,
      url: this.url.value,
    };
    let save$ =
      this.id.value == 0
        ? this.storeMenuUseCaseService.execute(params)
        : this.updateMenuUseCaseService.execute(
            Object.assign({}, { id: this.id.value }, params)
          );
    save$.subscribe(
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
