import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[appDefaultTableMobileItemView]',
    standalone: false
})
export class DefaultTableMobileItemViewDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
