import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormErrorRequiredComponent } from './form-error/form-error-required/form-error-required.component';
import { FormErrorEmailComponent } from './form-error/form-error-email/form-error-email.component';

@NgModule({
  declarations: [FormErrorRequiredComponent, FormErrorEmailComponent],
  exports: [FormErrorRequiredComponent, FormErrorEmailComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule],
})
export class DefaultFormModule {}
