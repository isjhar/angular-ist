import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private usermanagementService: UserManagementService, private router: Router) { }

  ngOnInit(): void {

  }

  onLoginformSubmited(): void {
    this.usermanagementService.getCsrfToken()
    .subscribe(response => {
      console.log(response);
      this.usermanagementService.login(this.loginForm.value)
        .subscribe(response => {
          this.router.navigate(['dashboard'])
        });
    });
  }
}
