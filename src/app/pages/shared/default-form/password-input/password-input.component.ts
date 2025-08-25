import {
  Component,
  computed,
  ContentChild,
  forwardRef,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { InputErrorComponent } from 'src/app/pages/shared/default-form/input-error/input-error.component';

@Component({
  selector: 'app-password-input',
  imports: [
    FormsModule,
    MatLabel,
    MatIcon,
    MatSuffix,
    MatIconButton,
    MatInput,
    MatFormField,
    MatError,
    ReactiveFormsModule,
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @ContentChild(InputErrorComponent) error?: InputErrorComponent;

  hide = signal(true);
  type = computed(() => (this.hide() ? 'password' : 'text'));
  icon = computed(() => (this.hide() ? 'visibility_off' : 'visibility'));
  value: string = '';

  passwordControl = new FormControl('', Validators.required);
  passwordValueChangeSubscription?: Subscription;

  // callbacks
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit(): void {
    this.passwordValueChangeSubscription =
      this.passwordControl.valueChanges.subscribe((value) => {
        this.updateValue(value ?? '');
      });
  }

  ngOnDestroy(): void {
    this.passwordValueChangeSubscription?.unsubscribe();
  }

  // ControlValueAccessor interface
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  disabled = false;

  // Event when user types
  updateValue(value: string) {
    this.value = value;
    this.onChange(this.value);
  }

  toggle(event: Event) {
    event.stopPropagation();
    this.hide.set(!this.hide());
  }
}
