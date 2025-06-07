import { Component, OnInit } from '@angular/core';
import { FormErrorComponent } from '../form-error.component';

@Component({
    selector: 'app-form-error-greater-than',
    templateUrl: './form-error-greater-than.component.html',
    styleUrls: ['./form-error-greater-than.component.scss'],
    standalone: false
})
export class FormErrorGreaterThanComponent extends FormErrorComponent {}
