import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from './api';
import { UserManagementService } from './user-management.service';

export interface User {
  email: string;
  name: string;
  roles: UserRole[];
}

interface UserRole {
  id: number;
  name: string;
  menus: RoleMenu[];
}

interface RoleMenu {
  id: number;
  name: string;
  url?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly IS_LOGGED_IN = 'IS_LOGGED_IN';
  readonly LOGGED_USER = 'LOGGED_USER';
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return localStorage.getItem(this.IS_LOGGED_IN) !== null;
  }

  login(): void {
    localStorage.setItem(this.IS_LOGGED_IN, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.IS_LOGGED_IN);
    localStorage.removeItem(this.LOGGED_USER);
  }

  getUser(): Observable<User> {
    if (localStorage.getItem(this.LOGGED_USER) === null) {
      return this.http
        .get<ApiResponse<User>>('/api/user')
        .pipe(map((x) => x.data));
    } else {
      let user: User = JSON.parse(localStorage.getItem(this.LOGGED_USER)!);
      return of(user);
    }
  }
}
