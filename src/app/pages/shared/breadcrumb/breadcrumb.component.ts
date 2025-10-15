import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Breadcrumb } from 'src/app/domain/entities/breadcrumb';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';
import { GetBreadcrumbsUseCase } from 'src/app/domain/use-cases/get-breadcrumbs-use-case';
import { GetMenusUseCase } from 'src/app/domain/use-cases/get-menus-use-case';
import { BREADCRUMB_REPOSITORY } from 'src/app/app-local-repository';
import { BaseComponent } from '../base.component';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [RouterLink, NgTemplateOutlet, AsyncPipe],
})
export class BreadcrumbComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  breadcrumbs = signal<Breadcrumb[]>([]);
  paths: string[] = [];
  getMenusUseCase: GetMenusUseCase;
  dynamicLabel = signal('');

  private _dynamicLabelSubscription?: Subscription;

  constructor(
    @Inject(BREADCRUMB_REPOSITORY)
    private breadCrumbRepository: BreadcrumbRepository,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    super();
    this.getMenusUseCase = new GetBreadcrumbsUseCase(breadCrumbRepository);
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.paths = this.router.url.split('/');
      }
    });
  }

  override ngOnInit(): void {
    this.getMenusUseCase.execute({}).subscribe((response) => {
      this.breadcrumbs.set(response.pagination.items);
    });

    this._dynamicLabelSubscription = this.breadCrumbRepository
      .dynamicLabelChanges()
      .subscribe((label) => {
        this.dynamicLabel.set(label);
        this.breadcrumbs.set(this.breadcrumbs().map((item) => ({ ...item })));
      });
  }

  override ngOnDestroy(): void {
    this._dynamicLabelSubscription?.unsubscribe();
    super.ngOnDestroy();
  }
}
