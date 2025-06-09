import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    LoginComponent,
],
})
export class LoginModule {}
