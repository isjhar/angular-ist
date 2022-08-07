import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  template: '',
})
export abstract class FormErrorComponent implements OnInit {
  @Input() name: string = '';

  formControl!: FormControl;
  constructor(private form: FormGroupDirective) {}

  ngOnInit(): void {
    this.formControl = this.form.form.get(this.name) as FormControl;
  }
}
