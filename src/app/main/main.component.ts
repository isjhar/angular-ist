import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit(): void {}

  onLogoutClicked(): void {
    this.userManagementService.logout().subscribe((response) => {
      this.authService.logout();
      this.router.navigate(['/login']);
    });
  }
}
