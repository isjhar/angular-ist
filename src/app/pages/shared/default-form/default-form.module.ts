import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormErrorRequiredComponent } from './form-error/form-error-required/form-error-required.component';
import { FormErrorEmailComponent } from './form-error/form-error-email/form-error-email.component';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormErrorTimeFormatComponent } from './form-error/form-error-time-format/form-error-time-format.component';
import { CurrencyInputDirective } from './currency-input.directive';
import { FormErrorGreaterThanComponent } from './form-error/form-error-greater-than/form-error-greater-than.component';
@NgModule({
  declarations: [
    FormErrorRequiredComponent,
    FormErrorEmailComponent,
    LoadingButtonComponent,
    FormErrorTimeFormatComponent,
    CurrencyInputDirective,
    FormErrorGreaterThanComponent,
  ],
  exports: [
    FormErrorRequiredComponent,
    FormErrorEmailComponent,
    LoadingButtonComponent,
    FormErrorTimeFormatComponent,
    CurrencyInputDirective,
    FormErrorGreaterThanComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class DefaultFormModule {}
