import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-decrement-button',
  imports: [MatIcon, MatIconButton],
  templateUrl: './decrement-button.component.html',
  styleUrl: './decrement-button.component.scss',
})
export class DecrementButtonComponent {
  @Input() min?: number;
  @Input() control: AbstractControl | null = null;

  get disabled() {
    return this.min && this.control && this.control.value <= this.min;
  }

  onClick(): void {
    this.control?.markAsTouched();
    this.control?.setValue(this.control?.value + 1);
  }
}
