import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: 'button[appIncrement]',
})
export class IncrementDirective implements OnInit {
  @Input() max?: number;
  @Input('appIncrement') control: AbstractControl | null = null;
  @HostBinding('disabled') isDisabled = false;

  get disabled() {
    return this.max && this.control && this.control.value >= this.max
      ? true
      : false;
  }

  ngOnInit(): void {
    this.checkDisabled();
    this.control?.valueChanges.subscribe(() => {
      this.checkDisabled();
    });
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    this.control?.markAsTouched();
    this.control?.setValue(this.control?.value + 1);
  }

  checkDisabled() {
    this.isDisabled = this.disabled;
  }
}
