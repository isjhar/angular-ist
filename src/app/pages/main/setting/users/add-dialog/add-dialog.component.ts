import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GetRolesUseCaseService } from 'src/app/domain/usecases/get-roles-use-case.service';
import { StoreUserUseCaseService } from 'src/app/domain/usecases/store-user-use-case.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  currentPassword: string = '';
  roleOptions: any[] = [];
  isLoading: boolean = false;
  error: string = '';

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required,
      (control: AbstractControl) => {
        let confirmPassword = control as FormControl;
        if (confirmPassword.value === this.currentPassword) {
          return null;
        }
        return {
          passwordMismatch: true,
        };
      },
    ]),
    roles: new FormControl([]),
  });

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get email() {
    return this.formGroup.get('email') as FormControl;
  }

  get password() {
    return this.formGroup.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword') as FormControl;
  }

  get roles() {
    return this.formGroup.get('roles') as FormControl;
  }

  constructor(
    private getRolesUseCaseService: GetRolesUseCaseService,
    private storeUserUseCaseService: StoreUserUseCaseService,
    private dialogRef: MatDialogRef<AddDialogComponent>
  ) {}

  ngOnInit(): void {
    this.password.valueChanges.subscribe((value) => {
      this.currentPassword = value;
    });
    this.getRoles();
  }

  onSubmitted(): void {
    this.isLoading = true;
    let roles = this.roles.value as any[];
    this.storeUserUseCaseService
      .execute({
        email: this.email.value,
        name: this.name.value,
        password: this.password.value,
        roles: roles.map((x) => x.id),
      })
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.dialogRef.close('success');
        },
        (response) => {
          this.isLoading = false;
          this.error = response;
        }
      );
  }

  removeRole(role: any): void {
    const roles = this.roles.value as any[];
    let index = roles.findIndex((x) => x.id == role.id);
    roles.splice(index, 1);
    this.roles.setValue(roles);
  }

  getRoles(): void {
    this.getRolesUseCaseService.execute({}).subscribe((response) => {
      this.roleOptions = response.data;
    });
  }
}
