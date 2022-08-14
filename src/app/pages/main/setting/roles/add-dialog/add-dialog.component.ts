import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetMenusUseCaseService } from 'src/app/domain/usecases/get-menus-use-case.service';
import { StoreRoleUseCaseService } from 'src/app/domain/usecases/store-role-use-case.service';
import { UpdateRoleUseCaseService } from 'src/app/domain/usecases/update-role-use-case.service';

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
    menus: new FormControl([]),
  });

  get id() {
    return this.formGroup.get('id') as FormControl;
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get menus() {
    return this.formGroup.get('menus') as FormControl;
  }

  constructor(
    private getMenusUseCaseService: GetMenusUseCaseService,
    private storeRoleUseCaseService: StoreRoleUseCaseService,
    private updateRoleUseCaseService: UpdateRoleUseCaseService,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData
  ) {}

  ngOnInit(): void {
    this.getMenus();
  }

  onSubmitted(): void {
    this.isLoading = true;
    let menus = this.menus.value as any[];
    let params = {
      name: this.name.value,
      menus: menus.map((x) => x.id),
    };
    if (this.id.value == 0) {
      this.storeRoleUseCaseService.execute(params).subscribe(
        (response) => {
          this.isLoading = false;
          this.dialogRef.close('success');
        },
        (error) => {
          this.isLoading = false;
          this.error = error;
        }
      );
    } else {
      this.updateRoleUseCaseService
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

  removeMenu(menu: any): void {
    const menus = this.menus.value as any[];
    let index = menus.findIndex((x) => x.id == menu.id);
    menus.splice(index, 1);
    this.menus.setValue(menus);
  }

  getMenus(): void {
    this.getMenusUseCaseService.execute({}).subscribe((response) => {
      this.menuOptions = response.pagination.data;
      this.formGroup.patchValue({
        id: this.data.value.id,
        name: this.data.value.name,
        menus: this.menuOptions.filter((x) =>
          this.data.value.menus.includes(x.id)
        ),
      });
    });
  }
}
