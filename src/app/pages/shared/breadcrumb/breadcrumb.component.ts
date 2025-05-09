import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Breadcrumb } from 'src/app/domain/entities/breadcrumb';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';
import { GetBreadcrumbsUseCase } from 'src/app/domain/use-cases/get-breadcrumbs-use-case';
import { GetMenusUseCase } from 'src/app/domain/use-cases/get-menus-use-case';
import { BREADCRUMB_REPOSITORY } from 'src/app/app-local-repository.module';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent extends BaseComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  paths: string[] = [];
  getMenusUseCase: GetMenusUseCase;

  constructor(
    @Inject(BREADCRUMB_REPOSITORY)
    breadCrumbRepository: BreadcrumbRepository,
    private router: Router
  ) {
    super();
    this.getMenusUseCase = new GetBreadcrumbsUseCase(breadCrumbRepository);
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.paths = this.router.url.split('/');
      }
    });
  }

  ngOnInit(): void {
    this.getMenusUseCase.execute({}).subscribe((response) => {
      this.breadcrumbs = response.pagination.data;
    });
  }
}
