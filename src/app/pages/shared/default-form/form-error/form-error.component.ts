import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  template: '',
  standalone: false,
})
export abstract class FormErrorComponent implements OnInit {
  @Input() name: string = '';
  @Input() formControlName: string = '';

  formControl!: FormControl;
  formControlNew?: FormControl;
  constructor(
    private form: FormGroupDirective,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    if (this.name) {
      this.formControlName = this.name;
    }
    this.formControl = this.form.form.get(this.formControlName) as FormControl;
  }
}
