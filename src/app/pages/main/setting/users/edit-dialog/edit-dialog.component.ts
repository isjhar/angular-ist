import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { concatMap, map, Observable, startWith } from 'rxjs';
import { ROLE_REPOSITORY, USER_REPOSITORY } from 'src/app/app-token-repository';
import { Role } from 'src/app/domain/entities/role';
import { RoleList } from 'src/app/domain/entities/role-list';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import { FormErrorEmailComponent } from 'src/app/pages/shared/default-form/form-error/form-error-email/form-error-email.component';
import { FormErrorPasswordComponent } from 'src/app/pages/shared/default-form/form-error/form-error-password/form-error-password.component';
import { FormErrorRequiredComponent } from 'src/app/pages/shared/default-form/form-error/form-error-required/form-error-required.component';
import { LoadingButtonComponent } from 'src/app/pages/shared/default-form/loading-button/loading-button.component';
import { FormDialogComponent } from 'src/app/pages/shared/form-dialog-component';

export interface EdiDialogData {
  value: {
    id: number;
    name: string;
    roles: number[];
  };
}

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    FormErrorRequiredComponent,
    LoadingButtonComponent,
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent extends FormDialogComponent implements OnInit {
  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;

  roleOptions: Observable<RoleList[]>;
  roleControl = new FormControl('');

  separatorKeysCodes: number[] = [ENTER, COMMA];

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    roles: new FormControl<RoleList[]>([], [Validators.required]),
  });

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  get roles() {
    return this.formGroup.get('roles') as FormControl<RoleList[]>;
  }

  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
    dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(ROLE_REPOSITORY) private roleRepository: RoleRepository,
    @Inject(MAT_DIALOG_DATA) public data: EdiDialogData,
  ) {
    super(dialogRef);

    this.roleRepository.get({}).subscribe({
      next: (response) => {
        this.formGroup.patchValue({
          name: this.data.value.name,
          roles: response.items.filter((x) =>
            this.data.value.roles.includes(x.id),
          ),
        });
      },
    });

    this.roleOptions = this.roleControl.valueChanges.pipe(
      startWith(''),
      concatMap((value: any) => {
        return this.roleRepository.get({
          search: typeof value === 'object' ? (value?.name ?? '') : value,
          limit: 5,
        });
      }),
      map((response) => {
        return response.items;
      }),
    );
  }

  onSubmitted(): void {
    this.isLoading = true;
    let roles = this.roles.value;
    this.userRepository
      .update(this.data.value.id, {
        name: this.name.value,
        roles: roles.map((x) => x.id),
      })
      .subscribe({
        next: (response) => {
          this.onSucceeded();
        },
        error: (error) => {
          this.onError(error);
        },
      });
  }

  removeRole(role: any): void {
    let roles = this.roles.value;
    let index = roles?.findIndex((x) => x.id == role.id);
    if (index == undefined) return;
    roles.splice(index, 1);
    this.roles.setValue(roles);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let roles = this.roles.value;
    if (roles.filter((x) => x.id == event.option.value.id).length == 0) {
      roles.push(event.option.value);
      this.roles.setValue([...roles]);
    }
    this.roleInput.nativeElement.value = '';
    this.roleControl.setValue(null);
  }

  displayFn(role?: RoleList): string {
    return role && role.name ? role.name : '';
  }
}
