import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SetupParams } from 'src/app/domain/repositories/setup-repository';
import { LoadingButtonComponent } from '../shared/default-form/loading-button/loading-button.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CustomValidator } from 'src/app/pages/shared/default-form/custom-validator';
import { FormErrorEmailComponent } from 'src/app/pages/shared/default-form/form-error/form-error-email/form-error-email.component';
import { FormErrorPasswordComponent } from 'src/app/pages/shared/default-form/form-error/form-error-password/form-error-password.component';
import { FormErrorRequiredComponent } from 'src/app/pages/shared/default-form/form-error/form-error-required/form-error-required.component';
import { TogglePasswordDirective } from 'src/app/pages/shared/default-form/toggle-password.directive';
import { SubmissionComponent } from 'src/app/pages/shared/submission-component';
import { SetupStatusService } from 'src/app/pages/shared/setup-status.service';
import { SETUP_REPOSITORY } from 'src/app/app-token-repository';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    MatIcon,
    MatButtonModule,
    LoadingButtonComponent,
    FooterComponent,
    FormErrorEmailComponent,
    FormErrorPasswordComponent,
    FormErrorRequiredComponent,
    TogglePasswordDirective,
  ],
})
export class SetupComponent
  extends SubmissionComponent
  implements OnInit, OnDestroy
{
  setupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    password: new FormControl('', [
      Validators.required,
      CustomValidator.password,
    ]),
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
  });

  currentPassword: string = '';
  confirmPasswordSubscription?: Subscription;

  setupRepository = inject(SETUP_REPOSITORY);
  setupStatusService = inject(SetupStatusService);
  router = inject(Router);

  get email() {
    return this.setupForm.get('email') as FormControl;
  }

  get name() {
    return this.setupForm.get('name') as FormControl;
  }

  get password() {
    return this.setupForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.setupForm.get('confirmPassword') as FormControl;
  }

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.password.valueChanges.subscribe((value) => {
      this.currentPassword = value;
    });

    this.confirmPasswordSubscription = this.password.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe(() => {
        this.confirmPassword.updateValueAndValidity();
      });
  }

  override ngOnDestroy(): void {
    this.confirmPasswordSubscription?.unsubscribe();
  }

  onSetupSubmitted(): void {
    this.isLoading = true;
    const params: SetupParams = {
      name: this.setupForm.value.name ?? '',
      email: this.setupForm.value.email ?? '',
      password: this.setupForm.value.password ?? '',
    };
    this.setupRepository.setup(params).subscribe({
      next: () => {
        this.isLoading = false;
        this.setupStatusService.markSetupCompleted();
        this.snackBarService.showSuccess(
          $localize`:setupComplete:Setup complete`,
        );
        this.router.navigate(['login']);
      },
      error: (error) => {
        this.onError(error);
      },
    });
  }
}
