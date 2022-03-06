import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MenuHttpService } from '../../menu-http.service';
import { RoleHttpService } from '../../role-http.service';

export interface AddRoleDialogData {
  value: any;
}

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss'],
})
export class AddRoleDialogComponent implements OnInit {
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
    private roleHttpService: RoleHttpService,
    private menuHttpService: MenuHttpService,
    private dialogRef: MatDialogRef<AddRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddRoleDialogData
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
    let save$ =
      this.id.value == 0
        ? this.roleHttpService.store(params)
        : this.roleHttpService.update(this.id.value, params);
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

  removeMenu(menu: any): void {
    const menus = this.menus.value as any[];
    let index = menus.findIndex((x) => x.id == menu.id);
    menus.splice(index, 1);
    this.menus.setValue(menus);
  }

  getMenus(): void {
    this.menuHttpService.get().subscribe((response) => {
      this.menuOptions = response.data.data;
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
