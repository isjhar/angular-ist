import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, FormGroupDirective } from '@angular/forms';

@Component({
  template: '',
})
export abstract class FormErrorComponent implements OnInit {
  @Input() name: string = '';
  @Input() formControlName: string = '';

  formControl!: UntypedFormControl;
  constructor(private form: FormGroupDirective) {}

  ngOnInit(): void {
    if (this.name) {
      this.formControlName = this.name;
    }
    this.formControl = this.form.form.get(this.formControlName) as UntypedFormControl;
  }
}
