import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly IS_LOGGED_IN = 'IS_LOGGED_IN';
  constructor() {}

  isLoggedIn(): boolean {
    return localStorage.getItem(this.IS_LOGGED_IN) !== null;
  }

  login(): void {
    localStorage.setItem(this.IS_LOGGED_IN, '1');
  }
}
