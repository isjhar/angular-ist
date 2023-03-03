import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LogoutUseCase } from 'src/app/domain/use-cases/logout-use-case';
import { User } from 'src/app/domain/entities/user';
import { GetAuthenticatedUserUseCase } from 'src/app/domain/use-cases/get-authenticated-user-use-case';
import {
  AUTHENTICATED_USER_REPOSITORY,
  AUTH_REPOSITORY,
  MENU_REPOSITORY,
} from 'src/app/app.module';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { AuthRepository } from 'src/app/domain/repositories/auth-repository';
import { GetMenusUseCase } from 'src/app/domain/use-cases/get-menus-use-case';
import { MenuRepository } from 'src/app/domain/repositories/menu-repository';
import { Menu } from 'src/app/domain/entities/menu';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('0.1s', style({ height: '48px' })),
        animate('0.1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.1s', style({ opacity: 0 })),
        animate('0.1s', style({ height: '0px' })),
      ]),
    ]),
    trigger('openCloseIcon', [
      state(
        'open',
        style({
          transform: 'rotate(90deg)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class MainComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  getLoggedUserUseCase: GetAuthenticatedUserUseCase;
  getMenusUseCase: GetMenusUseCase;
  logoutUseCase: LogoutUseCase;
  menus: Menu[] = [];
  loggedUser?: User;

  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository,
    @Inject(MENU_REPOSITORY) menuRepository: MenuRepository,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.getLoggedUserUseCase = new GetAuthenticatedUserUseCase(
      authenticatedUserRepository
    );
    this.logoutUseCase = new LogoutUseCase(
      authenticatedUserRepository,
      authRepository
    );
    this.getMenusUseCase = new GetMenusUseCase(menuRepository);
  }

  ngOnInit(): void {
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
