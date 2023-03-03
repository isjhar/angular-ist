import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MENU_REPOSITORY } from 'src/app/app.module';
import { Menu } from 'src/app/domain/entities/menu';
import { MenuRepository } from 'src/app/domain/repositories/menu-repository';
import { GetMenusUseCase } from 'src/app/domain/use-cases/get-menus-use-case';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  menus: Menu[] = [];
  paths: string[] = [];
  getMenusUseCase: GetMenusUseCase;
  constructor(
    @Inject(MENU_REPOSITORY) menuRepository: MenuRepository,
    private router: Router
  ) {
    this.getMenusUseCase = new GetMenusUseCase(menuRepository);
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.paths = this.router.url.split('/');
      }
    });
  }

  ngOnInit(): void {
    this.getMenusUseCase.execute({}).subscribe((response) => {
      this.menus = response.pagination.data;
    });
  }
}
