import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-increment-button',
  imports: [MatIcon, MatIconButton],
  templateUrl: './increment-button.component.html',
  styleUrl: './increment-button.component.scss',
})
export class IncrementButtonComponent {
  @Input() max?: number;
  @Input() control: AbstractControl | null = null;

  get disabled() {
    return this.max && this.control && this.control.value >= this.max;
  }

  onClick(): void {
    this.control?.markAsTouched();
    this.control?.setValue(this.control?.value + 1);
  }
}
