import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { concatMap, map, shareReplay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../auth.service';
import { UserManagementService } from '../../user-management.service';
import { Menu, MenuService } from '../../menu.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LogoutUseCaseService } from 'src/app/domain/usecases/logout-use-case.service';
import { DeleteAuthenticatedUserUseCaseService } from 'src/app/domain/usecases/delete-authenticated-user-use-case.service';
import { GetLoggedUserUseCaseService } from 'src/app/domain/usecases/get-logged-user-use-case.service';

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

  loggedUser: User = {
    email: '',
    name: '',
    roles: [],
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private deleteAuthenticatedUserUseCaseService: DeleteAuthenticatedUserUseCaseService,
    private getLoggedUserUseCaseService: GetLoggedUserUseCaseService,
    private logoutUseCaseService: LogoutUseCaseService,
    private router: Router,
    private menuService: MenuService
  ) {
    this.menus = this.menuService.menus;
  }

  menus: Menu[];

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(): void {
    this.getLoggedUserUseCaseService.execute().subscribe((user) => {
      this.loggedUser = user;
      this.filterAccessibleMenu();
    });
  }

  filterAccessibleMenu(): void {
    this.menus.forEach((x) => {
      let isShow = false;
      for (let index = 0; index < this.loggedUser.roles.length; index++) {
        const element = this.loggedUser.roles[index];
        if (element.menus.map((x) => x.name).includes(x.name)) {
          isShow = true;
          break;
        }
      }
      x.isShow = isShow;
    });
  }

  onLogoutClicked(): void {
    this.logoutUseCaseService
      .execute()
      .pipe(
        concatMap((response) =>
          this.deleteAuthenticatedUserUseCaseService.execute()
        )
      )
      .subscribe((response) => {
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
