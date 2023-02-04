import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { concatMap, map, shareReplay } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, MenuService } from '../menu.service';
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
} from 'src/app/app.module';
import { AuthenticatedUserRepository } from 'src/app/domain/repositories/authenticated-user-repository';
import { AuthRepository } from 'src/app/domain/repositories/auth-repository';

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

  loggedUser!: User;

  getLoggedUserUseCase: GetAuthenticatedUserUseCase;
  logoutUseCase: LogoutUseCase;

  constructor(
    @Inject(AUTHENTICATED_USER_REPOSITORY)
    authenticatedUserRepository: AuthenticatedUserRepository,
    @Inject(AUTH_REPOSITORY) authRepository: AuthRepository,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private menuService: MenuService
  ) {
    this.menus = this.menuService.menus;

    this.getLoggedUserUseCase = new GetAuthenticatedUserUseCase(
      authenticatedUserRepository
    );
    this.logoutUseCase = new LogoutUseCase(
      authenticatedUserRepository,
      authRepository
    );
  }

  menus: Menu[];

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(): void {
    this.getLoggedUserUseCase.execute().subscribe((user) => {
      this.loggedUser = user;
      this.filterAccessibleMenu();
    });
  }

  filterAccessibleMenu(): void {
    this.menus.forEach((x) => {
      let isShow = true;
      // for (let index = 0; index < this.loggedUser.roles.length; index++) {
      //   const element = this.loggedUser.roles[index];
      //   if (element.menus.map((x) => x.name).includes(x.name)) {
      //     isShow = true;
      //     break;
      //   }
      // }
      x.isShow = isShow;
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
