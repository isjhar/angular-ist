import { LayoutModule } from '@angular/cdk/layout';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { LogoutUseCase } from 'src/app/domain/use-cases/logout-use-case';
import { User } from 'src/app/domain/entities/user';
import { GetAuthenticatedUserUseCase } from 'src/app/domain/use-cases/get-authenticated-user-use-case';
import { AUTH_REPOSITORY } from 'src/app/app-token-repository';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { AuthRepository } from 'src/app/domain/repositories/auth-repository';
import { GetMenusUseCase } from 'src/app/domain/use-cases/get-menus-use-case';
import { MenuRepository } from 'src/app/domain/repositories/menu-repository';
import { Menu } from 'src/app/domain/entities/menu';
import {
  AUTHENTICATED_USER_REPOSITORY,
  MENU_REPOSITORY,
} from 'src/app/app-local-repository';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { AsyncPipe, NgClass } from '@angular/common';
import { BaseComponent } from 'src/app/pages/shared/base.component';
import { BreadcrumbComponent } from 'src/app/pages/shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    RouterLink,
    AsyncPipe,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    BreadcrumbComponent,
    NgClass,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class MainComponent extends BaseComponent implements OnInit {
  getLoggedUserUseCase: GetAuthenticatedUserUseCase;
  getMenusUseCase: GetMenusUseCase;
  logoutUseCase: LogoutUseCase;
  menus: Menu[] = [];
  loggedUser?: User;
  url?: String;

  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository,
    @Inject(MENU_REPOSITORY) menuRepository: MenuRepository,
    private router: Router,
  ) {
    super();

    this.getLoggedUserUseCase = new GetAuthenticatedUserUseCase(
      authenticatedUserRepository,
    );
    this.logoutUseCase = new LogoutUseCase(
      authenticatedUserRepository,
      authRepository,
    );
    this.getMenusUseCase = new GetMenusUseCase(menuRepository);

    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
  }

  override ngOnInit(): void {
    this.getLoggedUser();
    this.getMenus();
  }

  getLoggedUser(): void {
    this.getLoggedUserUseCase.execute().subscribe((user) => {
      this.loggedUser = user;
    });
  }

  getMenus(): void {
    this.getMenusUseCase.execute({}).subscribe((response) => {
      this.menus = response.pagination.data;
    });
  }

  onLogoutClicked(): void {
    this.logoutUseCase.execute().subscribe((response) => {
      this.router.navigate(['/login']);
    });
  }

  expandedMenu: string = '';
  toggleMenu(name: string): void {
    if (this.expandedMenu == name) {
      this.expandedMenu = '';
      return;
    }
    this.expandedMenu = name;
  }
}
