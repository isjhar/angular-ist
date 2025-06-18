import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[appDefaultTableActionContainer]' })
export class DefaultTableActionContainerDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
