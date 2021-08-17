import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usermanagementService: UserManagementService, private router: Router) { }

  ngOnInit(): void {
    this.usermanagementService.getCsrfToken()
      .subscribe(response => {
        console.log(response);
        this.usermanagementService.login()
          .subscribe(response => {
            this.usermanagementService.getUser()
              .subscribe(response => {
                console.log(response);
              })
          });
      });
  }

}
