import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appDefaultTableTopActionContainer]',
})
export class DefaultTableTopActionContainerDirective {
  public templateRef = inject(TemplateRef<any>);
}
