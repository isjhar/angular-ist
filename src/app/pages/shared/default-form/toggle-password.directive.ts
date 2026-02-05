import {
  AfterContentInit,
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: 'button[appTogglePassword]',
})
export class TogglePasswordDirective implements AfterContentInit {
  @ContentChild(MatIcon) matIcon?: MatIcon;

  renderer = inject(Renderer2);

  visibilityIcon = 'visibility';
  visibilityOffIcon = 'visibility_off';

  constructor(private el: ElementRef) {}

  ngAfterContentInit() {
    this.changeIcon(this.visibilityIcon);
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
    const currentIcon = this.matIcon?.fontIcon;

    if (currentIcon === this.visibilityIcon) {
      this.changeIcon(this.visibilityOffIcon);
    } else {
      this.changeIcon(this.visibilityIcon);
    }
  }

  changeIcon(icon: string) {
    if (this.matIcon) {
      // Change the icon name by setting the fontIcon property
      this.matIcon.fontIcon = icon;
    }

    const matFormField = this.el.nativeElement.closest(
      'mat-form-field',
    ) as Element;
    if (matFormField) {
      const input = matFormField.querySelector('input[matinput]');
      this.renderer.setAttribute(
        input,
        'type',
        icon === this.visibilityIcon ? 'password' : 'text',
      );
    }
  }
}
