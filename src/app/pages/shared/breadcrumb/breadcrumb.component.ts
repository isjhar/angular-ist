import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BREADCRUMB_REPOSITORY } from 'src/app/app.module';
import { Breadcrumb } from 'src/app/domain/entities/breadcrumb';
import { BreadcrumbRepository } from 'src/app/domain/repositories/breadcrumb-repository';
import { GetBreadcrumbsUseCase } from 'src/app/domain/use-cases/get-breadcrumbs-use-case';
import { GetMenusUseCase } from 'src/app/domain/use-cases/get-menus-use-case';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  paths: string[] = [];
  getMenusUseCase: GetMenusUseCase;
  constructor(
    @Inject(BREADCRUMB_REPOSITORY)
    breadCrumbRepository: BreadcrumbRepository,
    private router: Router
  ) {
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
