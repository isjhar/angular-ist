import {
  Directive,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AUTHENTICATED_USER_REPOSITORY } from 'src/app/app-local-repository';
import { AccessControlId } from 'src/app/domain/entities/access-control';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';

@Directive({
  selector: '[appHasAccessControl]',
})
export class HasAccessControlDirective {
  private hasView = false;

  appHasAccessControl = input.required<AccessControlId>();
  private authenticatedUserRepository = inject<AuthenticatedUserRepository>(
    AUTHENTICATED_USER_REPOSITORY,
  );
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  async ngOnInit() {
    const accessControlId = this.appHasAccessControl();
    // 2. Clear the view just in case it was already rendered
    this.viewContainerRef.clear();
    this.hasView = false;

    this.authenticatedUserRepository
      .hasAccessControl(accessControlId)
      .subscribe((hasAccess) => {
        if (hasAccess && !this.hasView) {
          // If access is granted and the element is not yet rendered, render it.
          this.viewContainerRef.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!hasAccess && this.hasView) {
          // If access is denied and the element IS rendered, remove it.
          this.viewContainerRef.clear();
          this.hasView = false;
        }
      });
  }
}
