import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[appDefaultTableMobileItemView]' })
export class DefaultTableMobileItemViewDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
