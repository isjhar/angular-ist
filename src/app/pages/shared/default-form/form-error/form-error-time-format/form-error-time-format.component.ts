import { Component, OnInit } from '@angular/core';
import { FormErrorComponent } from '../form-error.component';

@Component({
    selector: 'app-form-error-time-format',
    templateUrl: './form-error-time-format.component.html',
    styleUrls: ['./form-error-time-format.component.scss'],
    standalone: false
})
export class FormErrorTimeFormatComponent extends FormErrorComponent {}
