import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Breadcrumb } from 'src/app/domain/entities/breadcrumb';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';
import { GetBreadcrumbsUseCase } from 'src/app/domain/use-cases/get-breadcrumbs-use-case';
import { GetMenusUseCase } from 'src/app/domain/use-cases/get-menus-use-case';
import { BREADCRUMB_REPOSITORY } from 'src/app/app-local-repository';
import { BaseComponent } from '../base.component';
import { Menu } from 'src/app/domain/entities/menu';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  imports: [RouterLink, AsyncPipe, NgClass],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  breadcrumbs: Breadcrumb[] = [];
  paths = signal<string[]>([]);
  getMenusUseCase: GetMenusUseCase;
  dynamicLabelDict: { [key: string]: string } = {};
  displayedBreadcrumbs = signal<BreadcrumbViewItem[]>([]);

  private _displayedBreadcrumbs: BreadcrumbViewItem[] = [];

  private _dynamicLabelDictSubscription?: Subscription;

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
        this.paths.set(this.router.url.split('/'));
        this.setDisplayedBreadcrumbs();
      }
    });
  }

  override ngOnInit(): void {
    this.getMenusUseCase.execute({}).subscribe((response) => {
      const items = response.pagination.items;
      this.breadcrumbs = items;
      this.setDisplayedBreadcrumbs();
    });
    this._dynamicLabelDictSubscription = this.breadCrumbRepository
      .dynamicLabelDictChanges()
      .subscribe((dict) => {
        this.dynamicLabelDict = dict;
        this.updateDisplayedBreadcrumbsLabel();
      });
  }

  override ngOnDestroy(): void {
    this._dynamicLabelDictSubscription?.unsubscribe();
    super.ngOnDestroy();
  }

  setDisplayedBreadcrumbs(): void {
    if (this.breadcrumbs.length == 0) return;

    const breadcrumbs: BreadcrumbViewItem[] = [];
    this.checkMenus(breadcrumbs, this.breadcrumbs, 0);
    this._displayedBreadcrumbs = breadcrumbs;

    if (!this.hasParameterizedUrl()) {
      this.displayedBreadcrumbs.set(this._displayedBreadcrumbs);
    }
  }

  updateDisplayedBreadcrumbsLabel(): void {
    const breadcrumbs = this._displayedBreadcrumbs;
    let isChanged = false;
    breadcrumbs.forEach((breadcrumb) => {
      if (
        breadcrumb.label &&
        breadcrumb.label.includes(':') &&
        this.dynamicLabelDict[breadcrumb.label.slice(1)]
      ) {
        breadcrumb.label = this.dynamicLabelDict[breadcrumb.label.slice(1)];
        breadcrumb.timestamp = Date.now();
        isChanged = true;
      }
    });
    if (isChanged) {
      this.displayedBreadcrumbs.set(breadcrumbs);
    }
  }

  checkMenus(items: BreadcrumbViewItem[], menus: Menu[], level: number): void {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      const currentPath = this.paths()[level];
      const isDynamicLabel =
        menu.url.includes(':') && /^[0-9]+$/.test(currentPath);
      let isMatch = menu.url == currentPath || isDynamicLabel;

      if (isMatch) {
        const parentUrl =
          items.length > 0 ? items[items.length - 1].fullUrl + '/' : '';
        let label = menu.name;
        if (isDynamicLabel) {
          label = menu.url;
        }

        items.push({
          label: label,
          fullUrl: parentUrl + currentPath,
          timestamp: Date.now(),
        });
        const childs = menu.childs;
        if (childs) {
          this.checkMenus(items, childs, level + 1);
        }
        return;
      }
    }
  }

  private hasParameterizedUrl(): boolean {
    return this._displayedBreadcrumbs.some((b) => b.label.includes(':'));
  }
}

interface BreadcrumbViewItem {
  label: string;
  fullUrl: string;
  timestamp: number;
}
