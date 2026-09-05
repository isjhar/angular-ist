import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: 'button[appDecrement]',
})
export class DecrementDirective implements OnInit {
  @Input() min?: number;
  @Input('appDecrement') control: AbstractControl | null = null;
  @HostBinding('disabled') isDisabled = false;

  get disabled(): boolean {
    return this.min && this.control && this.control.value <= this.min
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
    this.control?.setValue(this.control?.value - 1);
  }

  checkDisabled() {
    this.isDisabled = this.disabled;
  }
}
