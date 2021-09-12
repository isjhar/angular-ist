import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserManagementService } from '../user-management.service';

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

  ngOnInit(): void {}

  onLogoutClicked(): void {
    this.userManagementService.logout().subscribe((response) => {
      this.authService.logout();
      this.router.navigate(['/login']);
    });
  }
}
