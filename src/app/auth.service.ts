import { Injectable } from '@angular/core';

export interface User {
  email: string;
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
  constructor() {}

  isLoggedIn(): boolean {
    return localStorage.getItem(this.IS_LOGGED_IN) !== null;
  }

  login(data: any): void {
    localStorage.setItem(this.IS_LOGGED_IN, JSON.stringify(data));
  }

  logout(): void {
    localStorage.removeItem(this.IS_LOGGED_IN);
  }

  getUser(): User {
    let user: User = JSON.parse(localStorage.getItem(this.IS_LOGGED_IN)!);
    return user;
  }
}
