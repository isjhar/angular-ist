import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RolesHttpService } from '../../roles-http.service';
import { UsersHttpService } from '../../users-http.service';

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
    private userHttpService: UsersHttpService,
    private roleHttpService: RolesHttpService,
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
    this.userHttpService
      .storeUser({
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
          this.error = response.error.message
            ? response.error.message
            : 'internal server error';
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
    this.roleHttpService.get().subscribe((response) => {
      this.roleOptions = response.data.data;
    });
  }
}
