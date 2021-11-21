import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent implements OnInit {
  @Input() name: string = '';

  formControl!: FormControl;
  constructor(private form: FormGroupDirective) {}

  ngOnInit(): void {
    this.formControl = this.form.form.get(this.name) as FormControl;
  }
}
