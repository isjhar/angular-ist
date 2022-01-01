import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserManagementService } from '../user-management.service';

interface Menu {
  name: string;
  url: string;
  isShow: boolean;
  icon: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private authService: AuthService,
    private router: Router,
    private userManagementService: UserManagementService,
    private breakpointObserver: BreakpointObserver
  ) {}

  menus: Menu[] = [
    {
      name: 'Dashboard',
      url: '',
      isShow: false,
      icon: 'dashboard',
    },
    {
      name: 'Pendaftaran',
      url: '/pendaftaran',
      isShow: false,
      icon: 'app_registration',
    },
    {
      name: 'Pengaturan',
      url: '/pengaturan',
      isShow: false,
      icon: 'settings',
    },
  ];

  ngOnInit(): void {
    this.filterMenus();
  }

  filterMenus(): void {
    this.authService.getUser().subscribe((user) => {
      this.menus.forEach((x) => {
        let isShow = false;
        for (let index = 0; index < user.roles.length; index++) {
          const element = user.roles[index];
          if (element.menus.map((x) => x.name).includes(x.name)) {
            isShow = true;
            break;
          }
        }
        x.isShow = isShow;
      });
    });
  }

  onLogoutClicked(): void {
    this.userManagementService.logout().subscribe((response) => {
      this.authService.logout();
      this.router.navigate(['/login']);
    });
  }
}
