import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private userManagementService: UserManagementService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLoginformSubmitted(): void {
    this.userManagementService.getCsrfToken().subscribe((response) => {
      this.userManagementService
        .login(this.loginForm.value)
        .subscribe((response) => {
          this.userManagementService.getUser().subscribe((response) => {
            this.authService.login(response.data);
            this.router.navigate(['']);
          });
        });
    });
  }
}
