import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuHttpService } from '../../menu-http.service';

export interface AddMenuDialogData {
  value: any;
}
@Component({
  selector: 'app-add-menu-dialog',
  templateUrl: './add-menu-dialog.component.html',
  styleUrls: ['./add-menu-dialog.component.scss'],
})
export class AddMenuDialogComponent implements OnInit {
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
    private menuHttpService: MenuHttpService,
    private dialogRef: MatDialogRef<AddMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddMenuDialogData
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
        ? this.menuHttpService.store(params)
        : this.menuHttpService.update(this.id.value, params);
    save$.subscribe(
      (response) => {
        this.isLoading = false;
        this.dialogRef.close('success');
      },
      (response) => {
        this.isLoading = false;
        this.error = response.error.message
          ? response.error.message
          : 'internal server error';
      }
    );
  }
}
