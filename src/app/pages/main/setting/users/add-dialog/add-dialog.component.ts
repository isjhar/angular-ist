import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ROLE_REPOSITORY, USER_REPOSITORY } from 'src/app/app-token-repository';
import { RoleRepository } from 'src/app/domain/repositories/role-repository';
import { UserRepository } from 'src/app/domain/repositories/user-repository';
import { GetRolesUseCase } from 'src/app/domain/use-cases/get-roles-use-case';
import { StoreUserUseCase } from 'src/app/domain/use-cases/store-user-use-case';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import {
  Observable,
  Subscription,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs';
import { Role } from 'src/app/domain/entities/role';
import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { FormErrorRequiredComponent } from '../../../../shared/default-form/form-error/form-error-required/form-error-required.component';
import { FormErrorEmailComponent } from '../../../../shared/default-form/form-error/form-error-email/form-error-email.component';
import { LoadingButtonComponent } from '../../../../shared/default-form/loading-button/loading-button.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-dialog',
  imports: [
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    FormErrorRequiredComponent,
    FormErrorEmailComponent,
    LoadingButtonComponent,
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  standalone: true,
})
export class AddDialogComponent implements OnInit, OnDestroy {
  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;

  currentPassword: string = '';
  roleOptions: Observable<Role[]>;
  isLoading: boolean = false;
  error: string = '';

  roleControl = new FormControl('');
  separatorKeysCodes: number[] = [ENTER, COMMA];

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
    roles: new FormControl<Role[]>([], [Validators.required]),
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
    return this.formGroup.get('roles') as FormControl<Role[]>;
  }
  getRolesUseCase: GetRolesUseCase;
  storeUserUseCase: StoreUserUseCase;

  confirmPasswordSubscription?: Subscription;
  constructor(
    @Inject(ROLE_REPOSITORY) roleRepository: RoleRepository,
    @Inject(USER_REPOSITORY) userRepository: UserRepository,
    private dialogRef: MatDialogRef<AddDialogComponent>,
  ) {
    this.getRolesUseCase = new GetRolesUseCase(roleRepository);
    this.storeUserUseCase = new StoreUserUseCase(userRepository);

    this.roleOptions = this.roleControl.valueChanges.pipe(
      startWith(''),
      concatMap((value: any) => {
        return this.getRolesUseCase.execute({
          search: typeof value === 'object' ? (value?.name ?? '') : value,
          limit: 5,
        });
      }),
      map((response) => {
        return response.pagination.data;
      }),
    );
  }

  ngOnInit(): void {
    this.password.valueChanges.subscribe((value) => {
      this.currentPassword = value;
    });

    this.confirmPasswordSubscription = this.password.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((value) => {
        this.confirmPassword.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    this.confirmPasswordSubscription?.unsubscribe();
  }

  onSubmitted(): void {
    this.isLoading = true;
    let roles = this.roles.value;
    this.storeUserUseCase
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
        },
      );
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

  removeRole(role: any): void {
    let roles = this.roles.value;
    let index = roles?.findIndex((x) => x.id == role.id);
    if (index == undefined) return;
    roles.splice(index, 1);
    this.roles.setValue(roles);
  }

  displayFn(role?: Role): string {
    return role && role.name ? role.name : '';
  }
}
