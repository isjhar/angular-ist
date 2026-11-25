import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appDefaultTableFilterContainerContainer]',
})
export class DefaultTableFilterContainerContainerDirective {
  public templateRef = inject(TemplateRef<any>);
}
