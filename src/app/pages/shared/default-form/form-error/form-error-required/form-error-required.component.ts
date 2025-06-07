import { Component } from '@angular/core';
import { FormErrorComponent } from '../form-error.component';

@Component({
    selector: 'app-form-error-required',
    templateUrl: './form-error-required.component.html',
    styleUrls: ['./form-error-required.component.scss'],
    standalone: false
})
export class FormErrorRequiredComponent extends FormErrorComponent {}
